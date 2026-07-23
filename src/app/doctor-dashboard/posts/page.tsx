"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { createDoctorPost, getDoctorPosts } from "@/services/doctorService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [fees, setFees] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getDoctorPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsedFees = Number(fees);
    const hasValidFees = typeof fees === "number" || (typeof fees === "string" && fees.trim() !== "") && !Number.isNaN(parsedFees);

    if (!name.trim() || !title.trim() || !description.trim() || !body.trim() || !hasValidFees) {
      setError("All fields (name, title, description, content, and fees) are required.");
      return;
    }

    if (!image) {
      setError("Please upload an image before publishing the post.");
      return;
    }

    setSaving(true);
    try {
      await createDoctorPost({
        name,
        title,
        description,
        content: body,
        fees: Number(fees),
        image,
      });
      setName("");
      setTitle("");
      setDescription("");
      setBody("");
      setFees("");
      setImage(null);
      await fetchPosts();
    } catch (err: any) {
      console.error("Failed to create post:", err);
      setError(err.message || "Could not create post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: "doctorName", label: "Doctor" },
    { key: "name", label: "Name" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "content", label: "Content" },
    { key: "fees", label: "Fees" },
    { key: "imageUrl", label: "Image" },
    { key: "createdAt", label: "Created" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Doctor Posts</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage your doctor posts.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Post name"
            />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Post description"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full min-h-30 rounded-md border border-input bg-transparent p-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Post content"
            />
            <Input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value ? Number(e.target.value) : "")}
              placeholder="Consultation fees ($)"
              step="0.01"
              min="0"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">
                Post Image (Max 1MB)
              </label>
              <div className="rounded-md border border-border bg-card/70 p-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file && file.size > 1024 * 1024) {
                      setError("Image size must be less than 1MB");
                      setImage(null);
                      e.target.value = "";
                    } else {
                      setError(null);
                      setImage(file);
                    }
                  }}
                  className="w-full text-sm text-muted-foreground file:rounded-md file:border file:border-input file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:text-slate-700"
                />
              </div>
            </div>
            {image && (
              <div className="rounded-md border border-border bg-muted p-3">
                <p className="text-sm font-medium">Selected file</p>
                <p className="text-sm text-muted-foreground">{image.name}</p>
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <DataTable
          columns={columns}
          data={posts.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt).toLocaleString(),
          }))}
          renderCell={(row, key) => {
            if (key === "imageUrl") {
              return row.imageUrl ? (
                <img
                  src={row.imageUrl}
                  alt={row.title}
                  className="h-16 w-24 rounded object-cover"
                />
              ) : (
                <span className="text-sm text-muted-foreground">No image</span>
              );
            }
            if (key === "content") {
              return (
                <span className="block max-w-xl whitespace-pre-wrap">
                  {row.content}
                </span>
              );
            }
            return row[key];
          }}
        />
      )}
    </div>
  );
}