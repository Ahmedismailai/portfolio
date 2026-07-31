"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Camera, Save, Lock } from "lucide-react";
import ManagedImage from "@/components/ManagedImage";

const initialProfile = {
  name: "",
  email: "",
  github: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  facebook: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const getMe = async () => {
    const { data } = await API.get("/auth/me");


    const user = data.user;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      github: user.socialLinks?.github || "",
      linkedin: user.socialLinks?.linkedin || "",
      twitter: user.socialLinks?.twitter || "",
      instagram: user.socialLinks?.instagram || "",
      facebook: user.socialLinks?.facebook || "",
    });

    setPreview(user.avatar?.url || "");
  };

  useEffect(() => {
    getMe();
  }, []);

  const changeHandler = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const avatarHandler = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(profile).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (avatar) {
      formData.append("avatar", avatar);
    }

    await API.put("/auth/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Profile updated successfully");
    getMe();
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    await API.put("/auth/password", passwords);

    setPasswords({
      oldPassword: "",
      newPassword: "",
    });

    alert("Password updated successfully");
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Profile Management</h1>
        <p className="mt-2 text-white/55">
          Update your admin profile and social links.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <motion.form
          onSubmit={updateProfile}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-[#07111f]/70 p-6"
        >
          <h2 className="mb-6 text-2xl font-black">Basic Information</h2>

          <div className="mb-8 flex items-center gap-6">
            <div className="relative">
              <ManagedImage
                src={preview}
                alt="Admin"
                width={112}
                height={112}
                className="h-28 w-28 rounded-full border border-violet-500/50 object-cover"
              />

              <label className="absolute bottom-0 right-0 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={avatarHandler}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <h3 className="text-xl font-black">{profile.name}</h3>
              <p className="text-white/50">{profile.email}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["name", "Name"],
              ["email", "Email"],
              ["github", "Github URL"],
              ["linkedin", "LinkedIn URL"],
              ["twitter", "Twitter URL"],
              ["instagram", "Instagram URL"],
              ["facebook", "Facebook URL"],
            ].map(([name, placeholder]) => (
              <input
                key={name}
                name={name}
                value={profile[name]}
                onChange={changeHandler}
                placeholder={placeholder}
                className="rounded-2xl bg-white/5 p-4 outline-none"
              />
            ))}
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold">
            <Save size={18} /> Save Profile
          </button>
        </motion.form>

        <motion.form
          onSubmit={updatePassword}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-[#07111f]/70 p-6"
        >
          <h2 className="mb-6 text-2xl font-black">Change Password</h2>

          <input
            type="password"
            placeholder="Old Password"
            value={passwords.oldPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, oldPassword: e.target.value })
            }
            className="mb-4 w-full rounded-2xl bg-white/5 p-4 outline-none"
            required
            minLength={8}
            autoComplete="current-password"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            className="mb-6 w-full rounded-2xl bg-white/5 p-4 outline-none"
            required
            minLength={8}
            autoComplete="new-password"
          />

          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 font-bold">
            <Lock size={18} /> Update Password
          </button>
        </motion.form>
      </div>
    </section>
  );
}
