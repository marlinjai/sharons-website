'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const blogPostsData = {
  1: {
    title: "Hypnosis, Explained",
    subtitle: "Simple. Nerdy. Surprisingly Fun.",
    category: "Education",
    readTime: "8 min read",
    date: "March 20, 2024",
    excerpt: "Let's start from the top. Hypnosis is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.",
    content: `
      <div class="mb-8">
        <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;">✨ What Is Hypnosis, Really?</h2>
        <p class="mb-6">Let's start from the top.</p>
        <p class="mb-6">Hypnosis is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.</p>
        <p class="mb-6">It's not mind control. It's not sleep. And no, it's not dangerous.</p>
        <p class="mb-6">You naturally drift into this state twice a day:</p>
        <ul class="list-none space-y-2 mb-6">
          <li class="flex items-center gap-2"><span class="text-xl">🛌</span> Right before you fall asleep</li>
          <li class="flex items-center gap-2"><span class="text-xl">🌅</span> Right after you wake up</li>
        </ul>
        <p class="mb-6">That dreamy, floaty in-between moment? That's Theta*.</p>
        <p class="mb-6">Problem is, without guidance, it slips away fast, into deep sleep, or back to your to-do list.</p>
      </div>

      <div class="mb-8">
        <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;">Let's Get Nerdy! - The science behind it</h2>
        <p class="mb-6">The human brain operates primarily through three key brainwave states:</p>
        
        <div class="space-y-6 mb-8">
          <div class="bg-[#f7f6f2] rounded-xl p-6">
            <h3 class="font-secondary text-xl font-semibold mb-2">Beta (14-30 Hz)</h3>
            <p class="mb-2">🧠 Get Sht Done FM*</p>
            <p class="text-gray-700">Emails, deadlines, multitasking. Great for meetings - not for transformation.</p>
          </div>
          
          <div class="bg-[#f7f6f2] rounded-xl p-6">
            <h3 class="font-secondary text-xl font-semibold mb-2">Delta (0.5-4 Hz)</h3>
            <p class="mb-2">😴 Snore Like You Mean It</p>
            <p class="text-gray-700">This is knockout territory. No dreams, no drama. Just full-body cellular repair.</p>
          </div>
          
          <div class="bg-[#fcd8b3] rounded-xl p-6">
            <h3 class="font-secondary text-xl font-semibold mb-2">Theta (4-8 Hz)</h3>
            <p class="mb-2">🌀 Disclaimer: The Plot Is About to Twist</p>
            <p class="text-gray-700">Half-awake, half-dreaming.</p>
            <p class="text-gray-700">This is where memory, emotion, imagination, and your belief system live.</p>
            <p class="font-semibold mt-2">Theta* is where hypnosis works its magic.</p>
            <p class="text-gray-700">With the right guidance, you stay in Theta long enough to shift deep-rooted patterns that rule your inner world.</p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;">🧭 So why use Hypnosis?</h2>
        <p class="mb-6">Because Theta gives us direct access to your subconscious, which makes up 80 to 90% of the mind.</p>
        <p class="mb-6">Yep. Most of your decisions, habits, reactions, and beliefs? They're being run… behind the scenes.</p>
        <div class="space-y-2 mb-6">
          <p class="flex items-center gap-2"><span class="text-xl">🧑‍💼</span> Your conscious mind? Great employee.</p>
          <p class="flex items-center gap-2"><span class="text-xl">💼</span> Your subconscious? CEO, founder, strategic powerhouse.</p>
        </div>
        <p class="mb-6">Guess who's calling the shots?</p>
        <p class="italic text-gray-600 mb-6">- Actual footage of the Subconscious.</p>
      </div>

      <div class="mb-8">
        <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;">🔍 And what about Regression Hypnosis?</h2>
        <p class="mb-6">Regression doesn't mean running from your past.</p>
        <p class="mb-6">It means understanding the moments that shaped you, so they stop shaping your present without your permission.</p>
        <div class="bg-[#fcd8b3] rounded-xl p-6 mb-6">
          <p class="font-semibold text-lg">🧠 Revisit. Reframe. Rewrite.</p>
          <p class="text-gray-700">Understand your past to own your future.</p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;">✨ Ready to go deeper?</h2>
        <p class="mb-6">If your curiosity's poking at you… poke back.</p>
        <div class="text-center mb-8">
          <Link href="#contact" class="inline-flex items-center px-8 py-4 bg-[#C5441E] text-white rounded-full font-primary text-lg font-semibold hover:bg-[rgb(245,124,0)] transition-colors duration-200 shadow-lg">
            Book a session
          </Link>
        </div>
        <p class="mb-6">and let's unfold the greatest mystery of all - You.</p>
        <p class="mb-6">Or stick around, in the next ReTurn newsletter, we'll answer one of the juiciest (and most confusing) questions out there:</p>
        <p class="font-semibold mb-4">What's the difference between a hypnotist, hypnotherapist, and practitioner?</p>
        <p class="text-gray-700">Titles, training, and intention… not all are created equal. We'll untangle it together.</p>
      </div>
    `
  },
  2: {
    title: "Client Stories: From Fear to Freedom",
    subtitle: "",
    category: "Stories",
    readTime: "7 min read",
    date: "March 10, 2024",
    excerpt: "Real transformations and the healing power of regression therapy through authentic client experiences.",
    content: `
      <p class="mb-6">Every regression session is a unique journey, but the transformations often follow similar patterns - from fear and limitation to freedom and empowerment.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">Sarah's Story: Breaking Free from Anxiety</h3>
      <p class="mb-6">Sarah came to me struggling with crippling anxiety that had been with her for as long as she could remember. During her session, she accessed a past life where she had been trapped in a small, dark space for days. The fear and helplessness from that experience had carried over into her current life.</p>
      <p class="mb-6">Through the regression, Sarah was able to witness that experience from a place of safety and understanding. She realized that the anxiety wasn't hers to carry anymore - it belonged to a different time, a different life. Within weeks, her anxiety levels dropped dramatically.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">Michael's Transformation: Finding Purpose</h3>
      <p class="mb-6">Michael felt lost and directionless in his career. During his session, he discovered he had been a teacher in several past lives, always drawn to helping others learn and grow. This realization gave him the clarity to pursue his passion for education, leading to a fulfilling career change.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">Emma's Healing: Releasing Trauma</h3>
      <p class="mb-6">Emma carried deep emotional wounds from childhood trauma. In her regression, she accessed memories that helped her understand the root causes of her pain. More importantly, she was able to offer love and forgiveness to her younger self, leading to profound emotional healing.</p>
      
      <p class="italic text-gray-600">These stories remind us that transformation is always possible, no matter how stuck or fearful we may feel. The subconscious mind holds the keys to our freedom.</p>
    `
  },
  3: {
    title: "Preparing for Your First Session",
    subtitle: "",
    category: "Guide",
    readTime: "4 min read",
    date: "March 5, 2024",
    excerpt: "What to expect and how to make the most of your journey into the depths of consciousness.",
    content: `
      <p class="mb-6">Your first regression session is a sacred journey into the depths of your consciousness. Here's how to prepare for this transformative experience.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">Mental Preparation</h3>
      <p class="mb-6">Come with an open mind and heart. You don't need to believe in past lives for the session to be effective. Trust that your subconscious mind will bring forward whatever is most relevant for your healing and growth.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">Physical Preparation</h3>
      <p class="mb-6">Wear comfortable, loose-fitting clothing. Avoid heavy meals before the session, but don't come hungry either. The session will last 5 hours, so being comfortable is important.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">Questions to Consider</h3>
      <p class="mb-6">Think about what you'd like to explore or understand better. Common areas include:</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Repeating patterns in relationships or career</li>
        <li>Unexplained fears or phobias</li>
        <li>Health issues with emotional roots</li>
        <li>Life purpose and direction</li>
        <li>Healing from past trauma</li>
      </ul>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">What to Expect</h3>
      <p class="mb-6">The session begins with a deep conversation where we explore your current situation and what you hope to discover. Then, I'll guide you into a relaxed state where you can access your subconscious mind. You'll remain fully aware and in control throughout the entire process.</p>
      
      <h3 class="font-secondary text-xl font-semibold mb-4" style="color: #A32015;">After the Session</h3>
      <p class="mb-6">You'll receive a full audio recording of your session to revisit anytime. Many clients find that insights continue to emerge in the days and weeks following the session. Trust the process and allow the healing to unfold naturally.</p>
      
      <p class="italic text-gray-600">Remember, there's no "right" way to experience regression. Every journey is unique and perfect for the individual taking it.</p>
    `
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPostsData[postId as keyof typeof blogPostsData];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-secondary text-4xl font-semibold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#A32015] hover:text-[#C5441E] transition-colors duration-200">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#fcd8b3] to-[#f7f6f2] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#A32015] font-primary text-sm font-semibold hover:text-[#C5441E] transition-colors duration-200 mb-8"
          >
            ← Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-white text-[#A32015] text-xs font-primary font-semibold uppercase tracking-wide rounded-full">
              {post.category}
            </span>
            <span className="text-xs font-primary text-gray-500">•</span>
            <span className="text-xs font-primary text-gray-500">{post.readTime}</span>
            <span className="text-xs font-primary text-gray-500">•</span>
            <span className="text-xs font-primary text-gray-500">{post.date}</span>
          </div>
          
          <h1 className="font-secondary text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="font-primary text-xl text-gray-600 mb-6 italic">
              {post.subtitle}
            </p>
          )}
          
          <p className="font-primary text-xl text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gradient-to-r from-[#f7f6f2] to-[#fcd8b3] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-secondary text-2xl font-semibold text-gray-900 mb-8 text-center">
            More Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogPostsData).map(([id, postData]) => {
              if (parseInt(id) === postId) return null;
              return (
                <Link 
                  key={id} 
                  href={`/blog/${id}`}
                  className="block bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-primary text-gray-500 uppercase tracking-wide">
                      {postData.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-primary text-gray-500">
                      {postData.readTime}
                    </span>
                  </div>
                  <h4 className="font-secondary text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {postData.title}
                  </h4>
                  <p className="font-primary text-gray-600 text-sm leading-relaxed">
                    {postData.excerpt}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 