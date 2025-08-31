import BookSession from "@/components/BookSession";

export type BlogPostType = {
  id: number;
  slug: string;
  image: string | null;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  content: React.ReactNode;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const blogPostsData: BlogPostType[] = [
  {
    id: 2,
    slug: slugify("Who's Who in the World of the Mind - Understanding Mental Health Professionals"),
    image: "https://images.unsplash.com/photo-1597673814716-4a1e58a1f6af?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Who's Who in the World of the Mind",
    subtitle: "Hypnotherapist? Psychologist? Hypnotist? Let's end the confusion...",
    category: "Education",
    readTime: "2 min read",
    date: "July 15, 2025",
    content: (
      <>
        <h2 className="font-secondary text-2xl font-semibold mb-6" style={{ color: '#A32015' }}>Who's Who in the World of the Mind</h2>
        <p className="mb-6">Hypnotherapist? Psychologist? Hypnotist? Let's end the confusion.</p>

        <p className="mb-6">Titles are helpful. But they don't always mean what you think they mean.<br />
          Some are medical.<br />
          Some are trained for deep emotional support.<br />
          Some guide you through transformation.<br />
          Some are great on stage.</p>

        <p className="mb-8">Here's what each one actually does - so you can make an informed choice based on what you need.</p>

        <h3 className="font-secondary text-xl font-semibold mb-6" style={{ color: '#A32015' }}>Who Does What?</h3>

        <div className="space-y-8">
          <div>
            <h4 className="font-secondary text-lg font-semibold mb-2">1. Psychologist</h4>
            <p className="mb-2"><strong>Training:</strong> Academic degree in psychology, typically 5 to 6 years, including a master's</p>
            <p className="mb-2"><strong>Helps with:</strong> Emotional support, mental health evaluation, behavioral strategies</p>
            <p className="mb-2"><strong>Best for:</strong> Talk therapy, understanding patterns, getting clarity on your inner world</p>
            <p className="mb-2"><strong>Limitations:</strong> Doesn't work directly with the subconscious. Often focused on conscious-level insight.</p>
          </div>

          <div>
            <h4 className="font-secondary text-lg font-semibold mb-2">2. Psychotherapist</h4>
            <p className="mb-2"><strong>Training:</strong> Postgraduate clinical psychotherapy training, often 4 to 6 years, sometimes following a psychology degree</p>
            <p className="mb-2"><strong>Helps with:</strong> Long-term emotional healing, relationships, trauma, anxiety, mood patterns</p>
            <p className="mb-2"><strong>Best for:</strong> Ongoing support, unpacking deep emotional layers</p>
            <p className="mb-2"><strong>Limitations:</strong> Can be time-intensive. Focuses more on analysis than action.</p>
          </div>

          <div>
            <h4 className="font-secondary text-lg font-semibold mb-2">3. Psychiatrist</h4>
            <p className="mb-2"><strong>Training:</strong> Medical doctor with specialization in psychiatry, in total around 10 to 12 years</p>
            <p className="mb-2"><strong>Helps with:</strong> Diagnosing mental illness, prescribing medication</p>
            <p className="mb-2"><strong>Best for:</strong> Clinical conditions that are severe or have progressed to a heavy stage, such as major depression, bipolar disorder, or schizophrenia.</p>
            <p className="mb-2"><strong>Limitations:</strong> Psychiatrists are not trained to offer talk therapy. Their role is to evaluate, diagnose, and prescribe. Their focus is medical, not therapeutic or subconscious</p>
          </div>

          <div>
            <h4 className="font-secondary text-lg font-semibold mb-2">4. Hypnotherapist</h4>
            <p className="mb-2"><strong>Training:</strong> Certified in hypnotherapy through recognized training programs</p>
            <p className="mb-2"><strong>Helps with:</strong> Accessing the subconscious, releasing blocks, shifting internal responses</p>
            <p className="mb-2"><strong>Best for:</strong> Fast, deep change on emotional or behavioral patterns</p>
            <p className="mb-2"><strong>Limitations:</strong> Not licensed to diagnose or treat clinical disorders. Effectiveness depends on depth of training and presence.</p>
          </div>

          <div>
            <h4 className="font-secondary text-lg font-semibold mb-2">5. Hypnotherapy Practitioner</h4>
            <p className="mb-2"><strong>Training:</strong> Varies by method, may include certified hypnotherapy, holistic modalities, regression work</p>
            <p className="mb-2"><strong>Helps with:</strong> Subconscious root work, regression, reframing, emotional integration</p>
            <p className="mb-2"><strong>Best for:</strong> Those ready to shift what's no longer serving them, at the source</p>
            <p className="mb-2"><strong>Limitations:</strong> Not medically or clinically licensed. Certification is often obtained through private academies, but standards and scope of practice vary widely. Outcomes depend on the practitioner's training, approach, and alignment with the client.</p>
          </div>

          <div>
            <h4 className="font-secondary text-lg font-semibold mb-2">6. Hypnotist (entertainment-focused)</h4>
            <p className="mb-2"><strong>Training:</strong> Usually trained in suggestion and stage performance.</p>
            <p className="mb-2"><strong>Helps with:</strong> Wowing audiences, party tricks, fun, and games.</p>
            <p className="mb-2"><strong>Best for:</strong> Laughter, not healing.</p>
            <p className="mb-2"><strong>Limitations:</strong> Not for therapeutic purposes. Not trauma-informed. Developed to impress and entertain in stage performances.</p>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <p>In a world full of titles, modalities, and acronyms, it's easy to get overwhelmed, or to assume that one path is automatically "better" than another.</p>
          <p className="font-semibold">But here's the truth:</p>
          <p>The best professional is the one who sees you, gets you, and can actually help you shift.</p>
          <p>Whether they hold a medical degree, a hypnotherapy certificate, or years of lived experience paired with emotional intelligence - what matters most is the fit.</p>
          <p>Ask questions. Follow your gut.</p>
          <p className="mb-8">And remember: real transformation doesn't always follow a linear path, but it should always feel aligned.</p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="mb-4">The curiosity for a Regression Hypnosis session is poking at you - poke back.</p>
            <div className="[&>a]:bg-[#c5441e] [&>a]:hover:bg-orange-500 [&>a]:transition-colors [&>a]:duration-200">
              <BookSession />
            </div>
          </div>

          <p className="mt-8">In the next ReTurn newsletter, we challenge the status quo and elaborate on different therapy modalities: "Awareness, Empowerment, Rewiring."</p>

          <p className="mt-6">Until next time, keep that curiosity switched on,</p>
          <p className="font-semibold">Sharon</p>
          <p className="text-gray-600">Founder, ReTurn</p>
        </div>
      </>
    )
  },
  {
    id: 3,
    slug: slugify("Awareness, Empowerment, Rewiring."),
    image: "https://images.unsplash.com/photo-1512641406448-6574e777bec6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Awareness, Empowerment, Rewiring.",
    subtitle: "Where does Real Empowerment lie?",
    category: "Education",
    readTime: "4 min read",
    date: "June 15, 2025",
    content: (
      <>
        <p className="mb-6">For decades (since Freud and Jung started dissecting the human mind), people from all walks of life have been sitting on the couch, pouring their hearts out to psychologists, therapists, and psychiatrists.</p>

        <p className="mb-6">All valuable. All extremely useful. And yes, I found emotional comfort in modern therapy as well.</p>

        <p className="mb-6">But here's the thing: I always felt there was a catch.</p>

        <p className="mb-6">Talking about my problems, traumas, and feelings? It made me feel lighter, as if I were finally unloading a backpack I had been carrying alone. But guess what happened after?</p>

        <p className="mb-6">That backpack slowly filled back up, and I found myself looking forward to my next session just for the relief of feeling lighter again.</p>

        <p className="mb-6">Therapy helped me, no doubt. But did I feel EMPOWERED? Not exactly.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4 mt-10" style={{ color: '#A32015' }}>The power of hypnosis: long-term shift</h3>

        <p className="mb-6">Here's the twist: Talking in circles about something for years doesn't make it lighter long-term.</p>

        <p className="mb-6">No matter how much we talk about it, or how many sessions we've had, the backpack's still heavy. You're just getting used to the weight.</p>

        <p className="mb-6">For me, talking therapy alone wasn't enough, cause I realized the real issue wasn't what happened.</p>

        <p className="mb-6">It was how that experience shaped my reality today, and whether I had the power to shift it.</p>

        <p className="mb-6">The events that shaped us most often happened when we were too young to have much say in the matter. And those moments? They're still hanging around, influencing our every move, thought, and emotion, sometimes, without us even realizing it.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4 mt-10" style={{ color: '#A32015' }}>So… what are the steps?</h3>

        <p className="mb-6">Talking about it is just Step 1. Gaining awareness is critical.</p>

        <p className="mb-6">But Step 2 is where the empowering happens. This is where we don't just talk about the past; we transform how it shapes us.</p>

        <p className="font-semibold mb-6">We ReTurn to ReWire.</p>

        <p className="mb-6">Because when you gain control over how your mind reacts to it, you take back your power.</p>

        <p className="mb-6">No, we don't erase the memory.<br />
          We change how it impacts you.</p>

        <p className="mb-6">Now you get to decide how to feel about it. That's the real empowerment.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4 mt-10" style={{ color: '#A32015' }}>Final Thoughts</h3>

        <p className="mb-6">If you've been stuck in the loop of talking about your problems without ever changing how you feel about them, it's time for a shift.</p>

        <p className="mb-6">Empowerment isn't just about understanding; it's about rewiring.</p>

        <p className="mb-6">And now that you know you can ReWire…<br />
          What story do you want to write next?</p>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-10">
          <p className="mb-4">If curiosity is poking at you - poke back.</p>
          <div className="[&>a]:bg-[#c5441e] [&>a]:hover:bg-orange-500 [&>a]:transition-colors [&>a]:duration-200">
            <BookSession />
          </div>
        </div>

        <p className="mt-8">In the next ReTurn newsletter, we investigate the historical side of it: "The Ancients and the Lost Art of Concinnitas."</p>

        <p className="mt-6">Until next time, keep that curiosity switched on,</p>
        <p className="font-semibold">Sharon</p>
        <p className="text-gray-600">Founder, ReTurn</p>
      </>
    )
  },
  {
    id: 3,
    slug: slugify("Preparing for Your Second Session"),
    image: "",
    title: "Preparing for Your Second Session",
    subtitle: "",
    category: "Guide",
    readTime: "4 min read",
    date: "March 5, 2024",
    content: (
      <>
        <p className="mb-6">Your first regression session is a sacred journey into the depths of your consciousness. Here's how to prepare for this transformative experience.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4" style={{ color: '#A32015' }}>Mental Preparation</h3>
        <p className="mb-6">Come with an open mind and heart. You don't need to believe in past lives for the session to be effective. Trust that your subconscious mind will bring forward whatever is most relevant for your healing and growth.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4" style={{ color: '#A32015' }}>Physical Preparation</h3>
        <p className="mb-6">Wear comfortable, loose-fitting clothing. Avoid heavy meals before the session, but don't come hungry either. The session will last 5 hours, so being comfortable is important.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4" style={{ color: '#A32015' }}>Questions to Consider</h3>
        <p className="mb-6">Think about what you'd like to explore or understand better. Common areas include:</p>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>Repeating patterns in relationships or career</li>
          <li>Unexplained fears or phobias</li>
          <li>Health issues with emotional roots</li>
          <li>Life purpose and direction</li>
          <li>Healing from past trauma</li>
        </ul>

        <h3 className="font-secondary text-xl font-semibold mb-4" style={{ color: '#A32015' }}>What to Expect</h3>
        <p className="mb-6">The session begins with a deep conversation where we explore your current situation and what you hope to discover. Then, I'll guide you into a relaxed state where you can access your subconscious mind. You'll remain fully aware and in control throughout the entire process.</p>

        <h3 className="font-secondary text-xl font-semibold mb-4" style={{ color: '#A32015' }}>After the Session</h3>
        <p className="mb-6">You'll receive a full audio recording of your session to revisit anytime. Many clients find that insights continue to emerge in the days and weeks following the session. Trust the process and allow the healing to unfold naturally.</p>

        <p className="italic text-gray-600">Remember, there's no "right" way to experience regression. Every journey is unique and perfect for the individual taking it.</p>
      </>
    )
  },
  {
    id: 1,
    slug: slugify("What Is Hypnosis, Really?"),
    image: null,
    title: "What Is Hypnosis, Really?",
    subtitle: "Let's start from the top. Hypnosis is a natural state of deep relaxation...",
    category: "Education",
    readTime: "3 min read",
    date: "August 15, 2025",
    content: (
      <>
        <div className="mb-8">
          <h2 className="font-secondary text-3xl font-semibold mb-4" style={{ color: '#A32015' }}>What Is Hypnosis, Really?</h2>
          <p className="mb-6">Let's start from the top.</p>
          <p className="mb-6">Hypnosis is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.</p>
          <p className="mb-6">It's not mind control. It's not sleep. And no, it's not dangerous.</p>
          <p className="mb-6">You naturally drift into this state twice a day:</p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center gap-2"> Right before you fall asleep</li>
            <li className="flex items-center gap-2"> Right after you wake up</li>
          </ul>
          <p className="mb-6">That dreamy, floaty in-between moment? That's Theta*.</p>
          <p className="mb-6">Problem is, without guidance, it slips away fast, into deep sleep, or back to your to-do list.</p>
        </div>

        <div className="mb-8">
          <h2 className="font-secondary text-3xl font-semibold mb-4" style={{ color: '#A32015' }}>Let's Get Nerdy! - The science behind it</h2>
          <p className="mb-6">The human brain operates primarily through three key brainwave states:</p>

          <div className="space-y-6 mb-8">
            <div className="bg-[#f7f6f2] rounded-xl p-6">
              <h3 className="font-secondary text-xl font-semibold mb-2">Beta (14-30 Hz)</h3>
              <p className="mb-2"> Get Sht Done FM*</p>
              <p className="text-gray-700">Emails, deadlines, multitasking. Great for meetings - not for transformation.</p>
            </div>

            <div className="bg-[#f7f6f2] rounded-xl p-6">
              <h3 className="font-secondary text-xl font-semibold mb-2">Delta (0.5-4 Hz)</h3>
              <p className="mb-2"> Snore Like You Mean It</p>
              <p className="text-gray-700">This is knockout territory. No dreams, no drama. Just full-body cellular repair.</p>
            </div>

            <div className="bg-[#fcd8b3] rounded-xl p-6">
              <h3 className="font-secondary text-xl font-semibold mb-2">Theta (4-8 Hz)</h3>
              <p className="mb-2"> Disclaimer: The Plot Is About to Twist</p>
              <p className="text-gray-700">Half-awake, half-dreaming.</p>
              <p className="text-gray-700">This is where memory, emotion, imagination, and your belief system live.</p>
              <p className="font-semibold mt-2">Theta* is where hypnosis works its magic.</p>
              <p className="text-gray-700">With the right guidance, you stay in Theta long enough to shift deep-rooted patterns that rule your inner world.</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="font-secondary text-3xl font-semibold mb-4" style={{ color: '#A32015' }}> So why use Hypnosis?</h2>
          <p className="mb-6">Because Theta gives us direct access to your subconscious, which makes up 80 to 90% of the mind.</p>
          <p className="mb-6">Yep. Most of your decisions, habits, reactions, and beliefs? They're being run… behind the scenes.</p>
          <div className="space-y-2 mb-6">
            <p className="flex items-center gap-2"> Your conscious mind? Great employee.</p>
            <p className="flex items-center gap-2"> Your subconscious? CEO, founder, strategic powerhouse.</p>
          </div>
          <p className="mb-6">Guess who's calling the shots?</p>
          <p className="italic text-gray-600 mb-6">- Actual footage of the Subconscious.</p>
        </div>

        <div className="mb-8">
          <h2 className="font-secondary text-3xl font-semibold mb-4" style={{ color: '#A32015' }}> And what about Regression Hypnosis?</h2>
          <p className="mb-6">Regression doesn't mean running from your past.</p>
          <p className="mb-6">It means understanding the moments that shaped you, so they stop shaping your present without your permission.</p>
          <div className="bg-[#fcd8b3] rounded-xl p-6 mb-6">
            <p className="font-semibold text-lg"> Revisit. Reframe. Rewrite.</p>
            <p className="text-gray-700">Understand your past to own your future.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-secondary text-3xl font-semibold mb-4" style={{ color: '#A32015' }}> Ready to go deeper?</h2>
          <p className="mb-6">If your curiosity's poking at you… poke back.</p>
          <div className="text-center mb-8">
            <BookSession />
          </div>
          <p className="mb-6">and let's unfold the greatest mystery of all - You.</p>
          <p className="mb-6">Or stick around, in the next ReTurn newsletter, we'll answer one of the juiciest (and most confusing) questions out there:</p>
          <p className="font-semibold mb-4">What's the difference between a hypnotist, hypnotherapist, and practitioner?</p>
          <p className="text-gray-700">Titles, training, and intention… not all are created equal. We'll untangle it together.</p>
        </div>
      </>
    )
  }

];
