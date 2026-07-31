const { configureCloudinary } = require("../config/cloudinary");
const uploadToCloudinary = require("./uploadToCloudinary");

const destroyAsset = async (publicId, resourceType = "image") => {
  if (!publicId) return;
  const cloudinary = configureCloudinary();
  await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
    resource_type: resourceType,
  });
};

const safelyDestroyAsset = async (
  publicId,
  destroy = destroyAsset,
  resourceType = "image",
) => {
  if (!publicId) return;

  try {
    await destroy(publicId, resourceType);
  } catch (error) {
    console.warn(`Cloudinary cleanup failed for ${publicId}: ${error.message}`);
  }
};

/**
 * Uploads the replacement first, persists its reference, and only then removes
 * the previous asset. A failed database write cleans up the new upload and
 * leaves the old asset intact.
 */
const replaceCloudinaryAsset = async ({
  fileBuffer,
  folder,
  previousAsset,
  persistAsset,
  resourceType = "image",
  upload = uploadToCloudinary,
  destroy = destroyAsset,
}) => {
  const result = await upload(fileBuffer, folder, resourceType);
  const nextAsset = {
    url: result.secure_url,
    public_id: result.public_id,
  };

  try {
    await persistAsset(nextAsset);
  } catch (error) {
    await safelyDestroyAsset(nextAsset.public_id, destroy, resourceType);
    throw error;
  }

  if (
    previousAsset?.public_id &&
    previousAsset.public_id !== nextAsset.public_id
  ) {
    await safelyDestroyAsset(previousAsset.public_id, destroy, resourceType);
  }

  return nextAsset;
};

module.exports = {
  destroyAsset,
  replaceCloudinaryAsset,
  safelyDestroyAsset,
};
