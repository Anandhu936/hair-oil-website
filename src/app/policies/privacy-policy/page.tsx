export default function Page() {
  return (
    <div className="min-h-screen bg-card py-16 px-4">
      <div className="max-w-2xl mx-auto text-center py-28">

        <h1 className="text-3xl font-medium text-foreground mb-10">
          Privacy Policy
        </h1>

        <div className="text-left text-foreground/70 text-sm leading-7 space-y-6">

          <p><strong>Last updated:</strong> November 28, 2024</p>

          <p>
            This Privacy Policy describes how <strong>Geethika</strong> (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses your personal
            information when you visit or make a purchase from our website.
          </p>

          <p>
            By using our services, you agree to the collection and use of
            information in accordance with this policy.
          </p>

          {/* Changes */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this policy from time to time. Updates will be posted
              on this page with a revised date.
            </p>
          </div>

          {/* Collection */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Information We Collect
            </h2>
            <p>
              We collect personal information such as your name, address, phone
              number, email, and order details.
            </p>
          </div>

          {/* Usage */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              How We Use Your Information
            </h2>
            <p>
              To process orders, improve services, communicate updates, and
              ensure security.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Cookies
            </h2>
            <p>
              We use cookies to enhance your experience and analyze website
              traffic.
            </p>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Sharing Information
            </h2>
            <p>
              We may share your data with payment providers, shipping partners,
              and service providers.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Security
            </h2>
            <p>
              We take reasonable measures to protect your data, but no method is
              100% secure.
            </p>
          </div>

          {/* Rights */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Your Rights
            </h2>
            <p>
              You may request access, correction, or deletion of your personal
              data.
            </p>
          </div>

          {/* Contact */}
          <div className="pt-6 space-y-2">
            <p><strong>Trade name:</strong> Geethika </p>
            <p><strong>Phone:</strong> +91 9847644412</p>
            <p><strong>Email:</strong> geethikahairoil@gmail.com</p>
            <p>
              <strong>Address:</strong> Earimala, Nayarkuzhi po, Kozhikode, 673601
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}