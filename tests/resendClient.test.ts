// The API routes call resend.emails.send() with html, text, replyTo and
// custom headers. This checks that Resend 6 still maps those fields onto the
// HTTP request the same way and returns { data, error } as the routes expect.
import { afterEach, expect, it, vi } from 'vitest';
import { Resend } from 'resend';

afterEach(() => vi.unstubAllGlobals());

it('sends html, text, reply-to and custom headers', async () => {
  const fetchMock = vi.fn(async () =>
    new Response(JSON.stringify({ id: 'email-id-1' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  );
  vi.stubGlobal('fetch', fetchMock);

  // A throwaway key built at run time; the request never leaves the process.
  const resend = new Resend(`re_test_${Math.random().toString(36).slice(2)}`);
  const result = await resend.emails.send({
    from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
    to: ['reader@example.com'],
    subject: 'Hello',
    replyTo: 'hello@returnhypnosis.com',
    headers: { 'X-Entity-Ref-ID': 'one-time-1' },
    html: '<p>Hi</p>',
    text: 'Hi',
  });

  expect(result.error).toBeNull();
  expect(result.data?.id).toBe('email-id-1');
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
  expect(url).toBe('https://api.resend.com/emails');
  const body = JSON.parse(String(init.body));
  expect(body).toMatchObject({
    from: 'Sharon Di Salvo <hello@returnhypnosis.com>',
    to: ['reader@example.com'],
    subject: 'Hello',
    reply_to: 'hello@returnhypnosis.com',
    headers: { 'X-Entity-Ref-ID': 'one-time-1' },
    html: '<p>Hi</p>',
    text: 'Hi',
  });
});
