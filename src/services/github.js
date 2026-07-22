// src/services/github.js
// Fetch issues with the label 'blog' from this repository
const REPO_OWNER = 'nothingnesscore';
const REPO_NAME = 'nothingness-wellbeing';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;

/**
 * Extracts the first image URL from a markdown string.
 * Looks for ![alt](url) format.
 */
function extractCoverImage(markdown) {
  if (!markdown) return null;
  const match = markdown.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
}

/**
 * Strips markdown and returns a brief excerpt.
 */
function extractBrief(markdown) {
  if (!markdown) return '';
  // Remove images
  let text = markdown.replace(/!\[.*?\]\(.*?\)/g, '');
  // Remove links but keep text
  text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  // Remove markdown headers
  text = text.replace(/#+\s/g, '');
  // Remove bold/italic
  text = text.replace(/[*_]{1,3}/g, '');
  
  text = text.trim();
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
}

/**
 * Calculates estimated read time (assuming 200 words per min)
 */
function calculateReadTime(markdown) {
  if (!markdown) return 1;
  const words = markdown.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export async function getPosts() {
  try {
    const response = await fetch(`${API_URL}?state=open&labels=blog`);
    if (!response.ok) throw new Error('Failed to fetch from GitHub API');
    
    const issues = await response.json();
    
    return issues.map(issue => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      brief: extractBrief(issue.body),
      coverImage: { url: extractCoverImage(issue.body) },
      publishedAt: issue.created_at,
      readTimeInMinutes: calculateReadTime(issue.body)
    }));
  } catch (error) {
    console.error("Error fetching GitHub issues:", error);
    return [];
  }
}

export async function getPostByNumber(number) {
  try {
    const response = await fetch(`${API_URL}/${number}`);
    if (!response.ok) throw new Error('Failed to fetch issue from GitHub API');
    
    const issue = await response.json();
    
    // We keep the cover image in the body so it renders, but we can also extract it for the hero
    const coverImageUrl = extractCoverImage(issue.body);
    
    return {
      title: issue.title,
      content: issue.body,
      coverImage: { url: coverImageUrl },
      publishedAt: issue.created_at,
      readTimeInMinutes: calculateReadTime(issue.body)
    };
  } catch (error) {
    console.error("Error fetching GitHub issue:", error);
    return null;
  }
}

export async function createPost(title, content, token) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: content,
        labels: ['blog']
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create post');
    }
    
    const issue = await response.json();
    return issue.number; // Return the new issue number to redirect to it
  } catch (error) {
    console.error("Error creating GitHub issue:", error);
    throw error;
  }
}
