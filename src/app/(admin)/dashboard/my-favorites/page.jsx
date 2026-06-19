import Image from "next/image";
import Link from "next/link";
import { Eye, HeartOff, Search } from "lucide-react";
import { favoriteDataById } from "@/lib/api/favorite";
import { getUseSession } from "@/lib/core/session";

export default async function MyFavoritesPage() {
  const user = await getUseSession();

  const favorites = await favoriteDataById(user?.id);
  // console.log(favorites);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              My Favorites ❤️
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your saved life lessons
            </p>
          </div>

          <div className="bg-indigo-50 px-5 py-3 rounded-xl">
            <span className="text-sm text-slate-500">Total Favorites</span>
            <h2 className="text-2xl font-bold text-indigo-600">
              {favorites.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search lessons..."
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <select className="border rounded-xl px-4 py-3">
            <option>All Categories</option>
            <option>Career</option>
            <option>Personal Growth</option>
            <option>Relationships</option>
          </select>

          {/* Tone */}
          <select className="border rounded-xl px-4 py-3">
            <option>All Tones</option>
            <option>Motivational</option>
            <option>Inspirational</option>
            <option>Sad</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left">Lesson</th>
                <th className="px-5 py-4 text-left">Category</th>
                <th className="px-5 py-4 text-left">Tone</th>
                <th className="px-5 py-4 text-left">Saved Date</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={lesson.lesson.imageUrl}
                        alt={lesson.lesson.title}
                        width={70}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{lesson.lesson.title}</h3>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {lesson.lesson.category}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {lesson.lesson.emotionalTone}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {new Date(lesson.saveAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/publicLessons/${lesson.lesson._id}`}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                      >
                        <Eye size={16} />
                        Details
                      </Link>

                      <button className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 cursor-pointer">
                        <HeartOff size={16} />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
