// src/services/hashnode.js
const HASHNODE_API = 'https://gql.hashnode.com/';

// The user will need to change this to their actual Hashnode host/domain once they set it up.
// For now, we'll use a placeholder or engineering.hashnode.com for testing, or we can use environment variables!
const PUBLICATION_HOST = process.env.REACT_APP_HASHNODE_HOST || 'engineering.hashnode.com';

export async function getPosts() {
  const query = `
    query Publication {
      publication(host: "${PUBLICATION_HOST}") {
        isTeam
        title
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data.data?.publication?.posts?.edges?.map(edge => edge.node) || [];
  } catch (error) {
    console.error("Error fetching Hashnode posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  const query = `
    query Publication($slug: String!) {
      publication(host: "${PUBLICATION_HOST}") {
        post(slug: $slug) {
          title
          content {
            html
          }
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { slug } }),
    });

    const data = await response.json();
    return data.data?.publication?.post;
  } catch (error) {
    console.error("Error fetching Hashnode post:", error);
    return null;
  }
}
