// app/api/admin/migrate/route.ts
// API endpoint to seed initial blog posts - protected, idempotent

import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { createPost, getAllPosts, generateSlug } from '@/lib/db';

// Initial blog posts data for seeding
const seedPosts = [
  {
    title: "Who's Who in the World of the Mind",
    subtitle: "Hypnotherapist? Psychologist? Hypnotist? Let's end the confusion...",
    category: 'Education',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1597673814716-4a1e58a1f6af?q=80&w=2940&auto=format&fit=crop',
    published: false,
    content: `<h2 style="color: #A32015;">Who's Who in the World of the Mind</h2>
<p>Hypnotherapist? Psychologist? Hypnotist? Let's end the confusion.</p>
<p>Titles are helpful. But they don't always mean what you think they mean.<br/>
Some are medical.<br/>
Some are trained for deep emotional support.<br/>
Some guide you through transformation.<br/>
Some are great on stage.</p>
<p>Here's what each one actually does - so you can make an informed choice based on what you need.</p>

<h3 style="color: #A32015;">Who Does What?</h3>

<h4>1. Psychologist</h4>
<p><strong>Training:</strong> Academic degree in psychology, typically 5 to 6 years, including a master's</p>
<p><strong>Helps with:</strong> Emotional support, mental health evaluation, behavioral strategies</p>
<p><strong>Best for:</strong> Talk therapy, understanding patterns, getting clarity on your inner world</p>
<p><strong>Limitations:</strong> Doesn't work directly with the subconscious. Often focused on conscious-level insight.</p>

<h4>2. Psychotherapist</h4>
<p><strong>Training:</strong> Postgraduate clinical psychotherapy training, often 4 to 6 years</p>
<p><strong>Helps with:</strong> Long-term emotional healing, relationships, trauma, anxiety, mood patterns</p>
<p><strong>Best for:</strong> Ongoing support, unpacking deep emotional layers</p>
<p><strong>Limitations:</strong> Can be time-intensive. Focuses more on analysis than action.</p>

<h4>3. Psychiatrist</h4>
<p><strong>Training:</strong> Medical doctor with specialization in psychiatry, around 10 to 12 years</p>
<p><strong>Helps with:</strong> Diagnosing mental illness, prescribing medication</p>
<p><strong>Best for:</strong> Clinical conditions that are severe or have progressed to a heavy stage</p>
<p><strong>Limitations:</strong> Not trained to offer talk therapy. Focus is medical, not therapeutic.</p>

<h4>4. Hypnotherapist</h4>
<p><strong>Training:</strong> Certified in hypnotherapy through recognized training programs</p>
<p><strong>Helps with:</strong> Accessing the subconscious, releasing blocks, shifting internal responses</p>
<p><strong>Best for:</strong> Fast, deep change on emotional or behavioral patterns</p>
<p><strong>Limitations:</strong> Not licensed to diagnose or treat clinical disorders.</p>

<h4>5. Hypnotherapy Practitioner</h4>
<p><strong>Training:</strong> Varies by method, may include certified hypnotherapy, holistic modalities, regression work</p>
<p><strong>Helps with:</strong> Subconscious root work, regression, reframing, emotional integration</p>
<p><strong>Best for:</strong> Those ready to shift what's no longer serving them, at the source</p>

<h4>6. Hypnotist (entertainment-focused)</h4>
<p><strong>Training:</strong> Usually trained in suggestion and stage performance</p>
<p><strong>Helps with:</strong> Wowing audiences, party tricks, fun, and games</p>
<p><strong>Best for:</strong> Laughter, not healing</p>
<p><strong>Limitations:</strong> Not for therapeutic purposes. Not trauma-informed.</p>

<p>In a world full of titles, modalities, and acronyms, it's easy to get overwhelmed.</p>
<p><strong>But here's the truth:</strong> The best professional is the one who sees you, gets you, and can actually help you shift.</p>
<p>Ask questions. Follow your gut. And remember: real transformation doesn't always follow a linear path, but it should always feel aligned.</p>`,
  },
  {
    title: 'Awareness, Empowerment, Rewiring.',
    subtitle: 'Where does Real Empowerment lie?',
    category: 'Education',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1512641406448-6574e777bec6?q=80&w=3087&auto=format&fit=crop',
    published: false,
    content: `<p>For decades (since Freud and Jung started dissecting the human mind), people from all walks of life have been sitting on the couch, pouring their hearts out to psychologists, therapists, and psychiatrists.</p>
<p>All valuable. All extremely useful. And yes, I found emotional comfort in modern therapy as well.</p>
<p>But here's the thing: I always felt there was a catch.</p>
<p>Talking about my problems, traumas, and feelings? It made me feel lighter, as if I were finally unloading a backpack I had been carrying alone. But guess what happened after?</p>
<p>That backpack slowly filled back up, and I found myself looking forward to my next session just for the relief of feeling lighter again.</p>
<p>Therapy helped me, no doubt. But did I feel EMPOWERED? Not exactly.</p>

<h3 style="color: #A32015;">The power of hypnosis: long-term shift</h3>
<p>Here's the twist: Talking in circles about something for years doesn't make it lighter long-term.</p>
<p>No matter how much we talk about it, or how many sessions we've had, the backpack's still heavy. You're just getting used to the weight.</p>
<p>For me, talking therapy alone wasn't enough, cause I realized the real issue wasn't what happened.</p>
<p>It was how that experience shaped my reality today, and whether I had the power to shift it.</p>

<h3 style="color: #A32015;">So… what are the steps?</h3>
<p>Talking about it is just Step 1. Gaining awareness is critical.</p>
<p>But Step 2 is where the empowering happens. This is where we don't just talk about the past; we transform how it shapes us.</p>
<p><strong>We ReTurn to ReWire.</strong></p>
<p>Because when you gain control over how your mind reacts to it, you take back your power.</p>
<p>No, we don't erase the memory. We change how it impacts you.</p>
<p>Now you get to decide how to feel about it. That's the real empowerment.</p>

<h3 style="color: #A32015;">Final Thoughts</h3>
<p>If you've been stuck in the loop of talking about your problems without ever changing how you feel about them, it's time for a shift.</p>
<p>Empowerment isn't just about understanding; it's about rewiring.</p>
<p>And now that you know you can ReWire… What story do you want to write next?</p>`,
  },
  {
    title: 'Preparing for Your Second Session',
    subtitle: '',
    category: 'Guide',
    readTime: '4 min read',
    image: '',
    published: false,
    content: `<p>Your first regression session is a sacred journey into the depths of your consciousness. Here's how to prepare for this transformative experience.</p>

<h3 style="color: #A32015;">Mental Preparation</h3>
<p>Come with an open mind and heart. You don't need to believe in past lives for the session to be effective. Trust that your subconscious mind will bring forward whatever is most relevant for your healing and growth.</p>

<h3 style="color: #A32015;">Physical Preparation</h3>
<p>Wear comfortable, loose-fitting clothing. Avoid heavy meals before the session, but don't come hungry either. The session will last 5 hours, so being comfortable is important.</p>

<h3 style="color: #A32015;">Questions to Consider</h3>
<p>Think about what you'd like to explore or understand better. Common areas include:</p>
<ul>
<li>Repeating patterns in relationships or career</li>
<li>Unexplained fears or phobias</li>
<li>Health issues with emotional roots</li>
<li>Life purpose and direction</li>
<li>Healing from past trauma</li>
</ul>

<h3 style="color: #A32015;">What to Expect</h3>
<p>The session begins with a deep conversation where we explore your current situation and what you hope to discover. Then, I'll guide you into a relaxed state where you can access your subconscious mind. You'll remain fully aware and in control throughout the entire process.</p>

<h3 style="color: #A32015;">After the Session</h3>
<p>You'll receive a full audio recording of your session to revisit anytime. Many clients find that insights continue to emerge in the days and weeks following the session. Trust the process and allow the healing to unfold naturally.</p>

<p><em>Remember, there's no "right" way to experience regression. Every journey is unique and perfect for the individual taking it.</em></p>`,
  },
  {
    title: 'What Is Hypnotherapy, Really?',
    subtitle: "Let's start from the top. Hypnotherapy is a natural state of deep relaxation...",
    category: 'Education',
    readTime: '3 min read',
    image: '',
    published: false,
    content: `<h2 style="color: #A32015;">What Is Hypnotherapy, Really?</h2>
<p>Let's start from the top.</p>
<p>Hypnotherapy is a natural state of deep relaxation where your mind focuses, your body softens, and your subconscious - the real boss - becomes open and responsive.</p>
<p>It's not mind control. It's not sleep. And no, it's not dangerous.</p>
<p>You naturally drift into this state twice a day:</p>
<ul>
<li>Right before you fall asleep</li>
<li>Right after you wake up</li>
</ul>
<p>That dreamy, floaty in-between moment? That's Theta*.</p>
<p>Problem is, without guidance, it slips away fast, into deep sleep, or back to your to-do list.</p>

<h2 style="color: #A32015;">Let's Get Nerdy! - The science behind it</h2>
<p>The human brain operates primarily through three key brainwave states:</p>

<div style="background: #f7f6f2; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
<h3>Beta (14-30 Hz)</h3>
<p>Get Sht Done FM* - Emails, deadlines, multitasking. Great for meetings - not for transformation.</p>
</div>

<div style="background: #f7f6f2; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
<h3>Delta (0.5-4 Hz)</h3>
<p>Snore Like You Mean It - This is knockout territory. No dreams, no drama. Just full-body cellular repair.</p>
</div>

<div style="background: #fcd8b3; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
<h3>Theta (4-8 Hz)</h3>
<p>Disclaimer: The Plot Is About to Twist - Half-awake, half-dreaming. This is where memory, emotion, imagination, and your belief system live.</p>
<p><strong>Theta* is where hypnosis works its magic.</strong></p>
<p>With the right guidance, you stay in Theta long enough to shift deep-rooted patterns that rule your inner world.</p>
</div>

<h2 style="color: #A32015;">So why use Hypnosis?</h2>
<p>Because Theta gives us direct access to your subconscious, which makes up 80 to 90% of the mind.</p>
<p>Yep. Most of your decisions, habits, reactions, and beliefs? They're being run… behind the scenes.</p>
<p>Your conscious mind? Great employee. Your subconscious? CEO, founder, strategic powerhouse.</p>
<p>Guess who's calling the shots?</p>

<h2 style="color: #A32015;">And what about Regression Hypnosis?</h2>
<p>Regression doesn't mean running from your past.</p>
<p>It means understanding the moments that shaped you, so they stop shaping your present without your permission.</p>
<div style="background: #fcd8b3; border-radius: 12px; padding: 24px;">
<p><strong>Revisit. Reframe. Rewrite.</strong></p>
<p>Understand your past to own your future.</p>
</div>

<h2 style="color: #A32015;">Ready to go deeper?</h2>
<p>If your curiosity's poking at you… poke back.</p>
<p>and let's unfold the greatest mystery of all - You.</p>`,
  },
];

// POST /api/admin/migrate - Seed initial posts (protected, idempotent)
export async function POST() {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if posts already exist (idempotent)
    const existing = getAllPosts();
    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already has ${existing.length} posts. No migration needed.`,
        count: existing.length,
      });
    }

    // Seed posts
    let imported = 0;
    for (const post of seedPosts) {
      createPost({
        slug: generateSlug(post.title),
        title: post.title,
        subtitle: post.subtitle,
        category: post.category,
        read_time: post.readTime,
        featured_image: post.image || null,
        content: post.content,
        published: post.published,
      });
      imported++;
    }

    return NextResponse.json({
      success: true,
      message: `Migration complete! Imported ${imported} posts.`,
      count: imported,
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/admin/migrate - Check migration status
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = getAllPosts();
    return NextResponse.json({
      hasPosts: posts.length > 0,
      count: posts.length,
      needsMigration: posts.length === 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check status', details: String(error) },
      { status: 500 }
    );
  }
}

