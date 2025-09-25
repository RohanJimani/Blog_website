import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import BlogCard from "../components/BlogCard";
import { mockBlogPosts } from "../data/mockData";

const HomePage = () => {
  const featuredPost = mockBlogPosts[0];
  const regularPosts = mockBlogPosts.slice(1);
  

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navbar */}
      {/* <Navbar /> */}

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured & Recent Posts */}
      
          {/* <div >
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-4">
                Featured & Latest Stories
              </h2>
              <p className="text-muted-foreground text-center text-lg">
                Discover the most engaging content from our community
              </p>
            </div>

          
          </div> */}
    

        {/* Newsletter Section */}
        {/* <section>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Story</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get the best stories from our community delivered to your inbox weekly.
              Join thousands of readers who stay updated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      {/* <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 BlogHub. Made with ❤️ for writers and readers.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage;
