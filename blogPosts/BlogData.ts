export type BlogPostType = {
  id: number;
  slug: string;
  image: string | null;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const blogPostsData: BlogPostType[] = [
  {
    id: 1,
    slug: slugify("Preparing for Your First Session"),
    image: "https://images.unsplash.com/photo-1597673814716-4a1e58a1f6af?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Preparing for Your First Session",
    subtitle: "What to expect and how to make the most of your journey into the depths of consciousness.",
    category: "Guide",
    readTime: "4 min read",
    date: "March 5, 2024",
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
  {
    id: 3,
    slug: slugify("Preparing for Your First Session"),
    image: "",
    title: "Preparing for Your First Session",
    subtitle: "",
    category: "Guide",
    readTime: "4 min read",
    date: "March 5, 2024",
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
    content: `
        <div class="mb-8">
          <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;">What Is Hypnosis, Really?</h2>
          <p class="mb-6">Let's start from the top.</p>
          <p class="mb-6">Hypnosis is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.</p>
          <p class="mb-6">It's not mind control. It's not sleep. And no, it's not dangerous.</p>
          <p class="mb-6">You naturally drift into this state twice a day:</p>
          <ul class="list-none space-y-2 mb-6">
            <li class="flex items-center gap-2"> Right before you fall asleep</li>
            <li class="flex items-center gap-2"> Right after you wake up</li>
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
              <p class="mb-2"> Get Sht Done FM*</p>
              <p class="text-gray-700">Emails, deadlines, multitasking. Great for meetings - not for transformation.</p>
            </div>

            <div class="bg-[#f7f6f2] rounded-xl p-6">
              <h3 class="font-secondary text-xl font-semibold mb-2">Delta (0.5-4 Hz)</h3>
              <p class="mb-2"> Snore Like You Mean It</p>
              <p class="text-gray-700">This is knockout territory. No dreams, no drama. Just full-body cellular repair.</p>
            </div>

            <div class="bg-[#fcd8b3] rounded-xl p-6">
              <h3 class="font-secondary text-xl font-semibold mb-2">Theta (4-8 Hz)</h3>
              <p class="mb-2"> Disclaimer: The Plot Is About to Twist</p>
              <p class="text-gray-700">Half-awake, half-dreaming.</p>
              <p class="text-gray-700">This is where memory, emotion, imagination, and your belief system live.</p>
              <p class="font-semibold mt-2">Theta* is where hypnosis works its magic.</p>
              <p class="text-gray-700">With the right guidance, you stay in Theta long enough to shift deep-rooted patterns that rule your inner world.</p>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;"> So why use Hypnosis?</h2>
          <p class="mb-6">Because Theta gives us direct access to your subconscious, which makes up 80 to 90% of the mind.</p>
          <p class="mb-6">Yep. Most of your decisions, habits, reactions, and beliefs? They're being run… behind the scenes.</p>
          <div class="space-y-2 mb-6">
            <p class="flex items-center gap-2"> Your conscious mind? Great employee.</p>
            <p class="flex items-center gap-2"> Your subconscious? CEO, founder, strategic powerhouse.</p>
          </div>
          <p class="mb-6">Guess who's calling the shots?</p>
          <p class="italic text-gray-600 mb-6">- Actual footage of the Subconscious.</p>
        </div>

        <div class="mb-8">
          <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;"> And what about Regression Hypnosis?</h2>
          <p class="mb-6">Regression doesn't mean running from your past.</p>
          <p class="mb-6">It means understanding the moments that shaped you, so they stop shaping your present without your permission.</p>
          <div class="bg-[#fcd8b3] rounded-xl p-6 mb-6">
            <p class="font-semibold text-lg"> Revisit. Reframe. Rewrite.</p>
            <p class="text-gray-700">Understand your past to own your future.</p>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="font-secondary text-3xl font-semibold mb-4" style="color: #A32015;"> Ready to go deeper?</h2>
          <p class="mb-6">If your curiosity's poking at you… poke back.</p>
          <div class="text-center mb-8">
          <BookSession />
          </div>
          <p class="mb-6">and let's unfold the greatest mystery of all - You.</p>
          <p class="mb-6">Or stick around, in the next ReTurn newsletter, we'll answer one of the juiciest (and most confusing) questions out there:</p>
          <p class="font-semibold mb-4">What's the difference between a hypnotist, hypnotherapist, and practitioner?</p>
          <p class="text-gray-700">Titles, training, and intention… not all are created equal. We'll untangle it together.</p>
        </div>
      `
  }

];
