// blogPosts/BlogDataJSX.tsx
import React from 'react';
import BookSession from '@/components/BookSession';

// Blog post type with JSX content
export type BlogPostJSXType = {
  id: number;
  slug: string;
  image: string | null;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  content: React.ReactNode; // JSX content instead of string
};

// Utility function to create slugs
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Blog section heading component
const BlogHeading = ({ children, level = 'h3' }: { children: React.ReactNode; level?: 'h2' | 'h3' }) => {
  const Component = level;
  const sizeClass = level === 'h2' ? 'text-3xl' : 'text-xl';

  return (
    <Component className={`font-secondary ${sizeClass} font-semibold mb-4`} style={{ color: '#A32015' }}>
      {children}
    </Component>
  );
};

// Blog paragraph component
const BlogParagraph = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`mb-6 ${className}`}>{children}</p>
);

// Blog list component
const BlogList = ({ children, ordered = false }: { children: React.ReactNode; ordered?: boolean }) => {
  const Component = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';

  return (
    <Component className={`${listClass} list-inside mb-6 space-y-2 text-gray-700`}>
      {children}
    </Component>
  );
};

// Blog highlight box component
const BlogHighlight = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'accent' }) => {
  const bgClass = variant === 'accent' ? 'bg-[#fcd8b3]' : 'bg-[#f7f6f2]';

  return (
    <div className={`${bgClass} rounded-xl p-6 mb-6`}>
      {children}
    </div>
  );
};

// Export blog posts with JSX content
export const blogPostsJSXData: BlogPostJSXType[] = [
  {
    id: 1,
    slug: slugify("Preparing for Your First Session"),
    image: "https://images.unsplash.com/photo-1597673814716-4a1e58a1f6af?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Preparing for Your First Session",
    subtitle: "What to expect and how to make the most of your journey into the depths of consciousness.",
    category: "Guide",
    readTime: "4 min read",
    date: "March 5, 2024",
    content: (
      <>
        <BlogParagraph>
          Your first regression session is a sacred journey into the depths of your consciousness. Here's how to prepare for this transformative experience.
        </BlogParagraph>

        <BlogHeading>Mental Preparation</BlogHeading>
        <BlogParagraph>
          Come with an open mind and heart. You don't need to believe in past lives for the session to be effective. Trust that your subconscious mind will bring forward whatever is most relevant for your healing and growth.
        </BlogParagraph>

        <BlogHeading>Physical Preparation</BlogHeading>
        <BlogParagraph>
          Wear comfortable, loose-fitting clothing. Avoid heavy meals before the session, but don't come hungry either. The session will last 5 hours, so being comfortable is important.
        </BlogParagraph>

        <BlogHeading>Questions to Consider</BlogHeading>
        <BlogParagraph>
          Think about what you'd like to explore or understand better. Common areas include:
        </BlogParagraph>
        <BlogList>
          <li>Repeating patterns in relationships or career</li>
          <li>Unexplained fears or phobias</li>
          <li>Health issues with emotional roots</li>
          <li>Life purpose and direction</li>
          <li>Healing from past trauma</li>
        </BlogList>

        <BlogHeading>What to Expect</BlogHeading>
        <BlogParagraph>
          The session begins with a deep conversation where we explore your current situation and what you hope to discover. Then, I'll guide you into a relaxed state where you can access your subconscious mind. You'll remain fully aware and in control throughout the entire process.
        </BlogParagraph>

        <BlogHeading>After the Session</BlogHeading>
        <BlogParagraph>
          You'll receive a full audio recording of your session to revisit anytime. Many clients find that insights continue to emerge in the days and weeks following the session. Trust the process and allow the healing to unfold naturally.
        </BlogParagraph>

        <BlogParagraph className="italic text-gray-600">
          Remember, there's no "right" way to experience regression. Every journey is unique and perfect for the individual taking it.
        </BlogParagraph>
        <p>tets</p>
      </>
    )
  },
  {
    id: 2,
    slug: slugify("Client Stories: From Fear to Freedom"),
    image: "https://images.unsplash.com/photo-1512641406448-6574e777bec6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Client Stories: From Fear to Freedom",
    subtitle: "",
    category: "Stories",
    readTime: "7 min read",
    date: "March 10, 2024",
    content: (
      <>
        <BlogParagraph>
          Every regression session is a unique journey, but the transformations often follow similar patterns - from fear and limitation to freedom and empowerment.
        </BlogParagraph>

        <BlogHeading>Sarah's Story: Breaking Free from Anxiety</BlogHeading>
        <BlogParagraph>
          Sarah came to me struggling with crippling anxiety that had been with her for as long as she could remember. During her session, she accessed a past life where she had been trapped in a small, dark space for days. The fear and helplessness from that experience had carried over into her current life.
        </BlogParagraph>
        <BlogParagraph>
          Through the regression, Sarah was able to witness that experience from a place of safety and understanding. She realized that the anxiety wasn't hers to carry anymore - it belonged to a different time, a different life. Within weeks, her anxiety levels dropped dramatically.
        </BlogParagraph>

        <BlogHeading>Michael's Transformation: Finding Purpose</BlogHeading>
        <BlogParagraph>
          Michael felt lost and directionless in his career. During his session, he discovered he had been a teacher in several past lives, always drawn to helping others learn and grow. This realization gave him the clarity to pursue his passion for education, leading to a fulfilling career change.
        </BlogParagraph>

        <BlogHeading>Emma's Healing: Releasing Trauma</BlogHeading>
        <BlogParagraph>
          Emma carried deep emotional wounds from childhood trauma. In her regression, she accessed memories that helped her understand the root causes of her pain. More importantly, she was able to offer love and forgiveness to her younger self, leading to profound emotional healing.
        </BlogParagraph>

        <BlogParagraph className="italic text-gray-600">
          These stories remind us that transformation is always possible, no matter how stuck or fearful we may feel. The subconscious mind holds the keys to our freedom.
        </BlogParagraph>
      </>
    )
  },
  {
    id: 4,
    slug: slugify("What Is Hypnosis, Really?"),
    image: null,
    title: "What Is Hypnosis, Really?",
    subtitle: "Let's start from the top. Hypnosis is a natural state of deep relaxation",
    category: "Education",
    readTime: "8 min read",
    date: "August 14, 2025",
    content: (
      <>
        <div className="mb-8">
          <BlogHeading level="h2">What Is Hypnosis, Really?</BlogHeading>
          <BlogParagraph>Let's start from the top.</BlogParagraph>
          <BlogParagraph>
            Hypnosis is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.
          </BlogParagraph>
          <BlogParagraph>It's not mind control. It's not sleep. And no, it's not dangerous.</BlogParagraph>
          <BlogParagraph>You naturally drift into this state twice a day:</BlogParagraph>
          <BlogList>
            <li className="flex items-center gap-2">✨ Right before you fall asleep</li>
            <li className="flex items-center gap-2">🌅 Right after you wake up</li>
          </BlogList>
          <BlogParagraph>That dreamy, floaty in-between moment? That's Theta*.</BlogParagraph>
          <BlogParagraph>
            Problem is, without guidance, it slips away fast, into deep sleep, or back to your to-do list.
          </BlogParagraph>
        </div>

        <div className="mb-8">
          <BlogHeading level="h2">Let's Get Nerdy! - The science behind it</BlogHeading>
          <BlogParagraph>The human brain operates primarily through three key brainwave states:</BlogParagraph>

          <div className="space-y-6 mb-8">
            <BlogHighlight>
              <h3 className="font-secondary text-xl font-semibold mb-2">Beta (14-30 Hz)</h3>
              <p className="mb-2">📻 Get Sh*t Done FM*</p>
              <p className="text-gray-700">Emails, deadlines, multitasking. Great for meetings - not for transformation.</p>
            </BlogHighlight>

            <BlogHighlight>
              <h3 className="font-secondary text-xl font-semibold mb-2">Delta (0.5-4 Hz)</h3>
              <p className="mb-2">😴 Snore Like You Mean It</p>
              <p className="text-gray-700">This is knockout territory. No dreams, no drama. Just full-body cellular repair.</p>
            </BlogHighlight>

            <BlogHighlight variant="accent">
              <h3 className="font-secondary text-xl font-semibold mb-2">Theta (4-8 Hz)</h3>
              <p className="mb-2">🌀 Disclaimer: The Plot Is About to Twist</p>
              <p className="text-gray-700">Half-awake, half-dreaming.</p>
              <p className="text-gray-700">This is where memory, emotion, imagination, and your belief system live.</p>
              <p className="font-semibold mt-2">Theta* is where hypnosis works its magic.</p>
              <p className="text-gray-700">
                With the right guidance, you stay in Theta long enough to shift deep-rooted patterns that rule your inner world.
              </p>
            </BlogHighlight>
          </div>
        </div>

        <div className="mb-8">
          <BlogHeading level="h2">So why use Hypnosis?</BlogHeading>
          <BlogParagraph>
            Because Theta gives us direct access to your subconscious, which makes up 80 to 90% of the mind.
          </BlogParagraph>
          <BlogParagraph>
            Yep. Most of your decisions, habits, reactions, and beliefs? They're being run… behind the scenes.
          </BlogParagraph>
          <div className="space-y-2 mb-6">
            <p className="flex items-center gap-2">🧠 Your conscious mind? Great employee.</p>
            <p className="flex items-center gap-2">👑 Your subconscious? CEO, founder, strategic powerhouse.</p>
          </div>
          <BlogParagraph>Guess who's calling the shots?</BlogParagraph>
          <BlogParagraph className="italic text-gray-600">- Actual footage of the Subconscious.</BlogParagraph>
        </div>

        <div className="mb-8">
          <BlogHeading level="h2">And what about Regression Hypnosis?</BlogHeading>
          <BlogParagraph>Regression doesn't mean running from your past.</BlogParagraph>
          <BlogParagraph>
            It means understanding the moments that shaped you, so they stop shaping your present without your permission.
          </BlogParagraph>
          <BlogHighlight variant="accent">
            <p className="font-semibold text-lg">🔄 Revisit. Reframe. Rewrite.</p>
            <p className="text-gray-700">Understand your past to own your future.</p>
          </BlogHighlight>
        </div>

        <div className="mb-8">
          <BlogHeading level="h2">Ready to go deeper?</BlogHeading>
          <BlogParagraph>If your curiosity's poking at you… poke back.</BlogParagraph>
          <div className="text-center mb-8">
            <BookSession />
          </div>
          <BlogParagraph>and let's unfold the greatest mystery of all - You.</BlogParagraph>
          <BlogParagraph>
            Or stick around, in the next ReTurn newsletter, we'll answer one of the juiciest (and most confusing) questions out there:
          </BlogParagraph>
          <p className="font-semibold mb-4">What's the difference between a hypnotist, hypnotherapist, and practitioner?</p>
          <p className="text-gray-700">Titles, training, and intention… not all are created equal. We'll untangle it together.</p>
        </div>
      </>
    )
  }
];
