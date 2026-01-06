import { supabase } from "@/utils/supabase/supabaseClient";

export async function dataPanel() {
  try {
    const [totalUsers, totalResources, totalNews, userActivity, recentResources, recentPosts] =
      await Promise.all([users(), resources(), news(), getUserActivity(), getRecentResources(), getRecentPosts()]);
    return { totalUsers, totalResources, totalNews, userActivity, recentResources, recentPosts };
  } catch (error) {
    console.error("Error fetching panel data:", error);
  }
}

async function users() {
  try {
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact" });
    return count;
  } catch (error) {
    throw error;
  }
}

async function resources() {
  try {
    const { count } = await supabase
      .from("resources")
      .select("*", { count: "exact" });
    return count;
  } catch (error) {
    throw error;
  }
}

async function news() {
  try {
    const { count } = await supabase
      .from("news")
      .select("*", { count: "exact" });
    return count;
  } catch (error) {
    throw error;
  }
}

async function getUserActivity() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email,full_name, avatar_url, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

async function getRecentResources() {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("id, title, created_at, status, description, slug")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

async function getRecentPosts() {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("id, title, created_at, status, content, slug")
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}