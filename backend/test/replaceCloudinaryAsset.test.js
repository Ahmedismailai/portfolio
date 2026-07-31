const test = require("node:test");
const assert = require("node:assert/strict");
const {
  replaceCloudinaryAsset,
} = require("../src/utils/replaceCloudinaryAsset");

test("persists a new image before deleting the previous Cloudinary asset", async () => {
  const calls = [];

  const asset = await replaceCloudinaryAsset({
    fileBuffer: Buffer.from("new-image"),
    folder: "portfolio/projects",
    previousAsset: { public_id: "old-image", url: "old-url" },
    upload: async () => {
      calls.push("upload");
      return { public_id: "new-image", secure_url: "new-url" };
    },
    persistAsset: async (nextAsset) => {
      calls.push(`persist:${nextAsset.public_id}`);
    },
    destroy: async (publicId) => {
      calls.push(`destroy:${publicId}`);
    },
  });

  assert.deepEqual(asset, {
    public_id: "new-image",
    url: "new-url",
  });
  assert.deepEqual(calls, [
    "upload",
    "persist:new-image",
    "destroy:old-image",
  ]);
});

test("keeps the previous image and removes the new upload when persistence fails", async () => {
  const destroyed = [];
  const databaseError = new Error("database unavailable");

  await assert.rejects(
    replaceCloudinaryAsset({
      fileBuffer: Buffer.from("new-image"),
      folder: "portfolio/blogs",
      previousAsset: { public_id: "old-image", url: "old-url" },
      upload: async () => ({
        public_id: "new-image",
        secure_url: "new-url",
      }),
      persistAsset: async () => {
        throw databaseError;
      },
      destroy: async (publicId) => {
        destroyed.push(publicId);
      },
    }),
    databaseError,
  );

  assert.deepEqual(destroyed, ["new-image"]);
});
