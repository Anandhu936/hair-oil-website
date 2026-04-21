export default function Page() {
  return (
    <div className="min-h-screen bg-card py-16 px-4">
      <div className="max-w-2xl mx-auto text-center py-28">

        {/* Title */}
        <h1 className="text-3xl font-medium text-foreground mb-10">
          Terms of Service
        </h1>

        {/* Content */}
        <div className="text-left text-foreground/70 text-sm leading-7 space-y-6">

          <p>
            Welcome to our website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern <strong>Geethika</strong>&apos;s relationship with
            you in relation to this website.
          </p>

          <p>
            If you disagree with any part of these terms and conditions, please
            do not use our website.
          </p>

          <p>
            The term <strong>‘Geethika’</strong> or ‘us’ or ‘we’ refers to the
            owner of the website. The term ‘you’ refers to the user or viewer of
            our website.
          </p>

          {/* Terms List */}
          <div className="space-y-4">
            <p>
              • The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
            </p>

            <p>
              • This website uses cookies to monitor browsing preferences. If
              you allow cookies, personal information may be stored for use by
              third parties.
            </p>

            <p>
              • Neither we nor any third parties provide any warranty or
              guarantee as to the accuracy, timeliness, performance,
              completeness, or suitability of the information.
            </p>

            <p>
              • Your use of any information or materials on this website is
              entirely at your own risk, for which we shall not be liable.
            </p>

            <p>
              • This website contains material owned or licensed by us,
              including design, layout, and graphics. Reproduction is
              prohibited.
            </p>

            <p>
              • All trademarks reproduced which are not owned by us are
              acknowledged on the website.
            </p>

            <p>
              • Unauthorized use of this website may result in claims for
              damages and/or criminal offense.
            </p>

            <p>
              • This website may include links to other websites for your
              convenience. We are not responsible for their content.
            </p>

            <p>
              • Your use of this website and any disputes are subject to the
              laws of India.
            </p>
          </div>

          {/* Contact Info */}
          <div className="pt-6 space-y-2">
            <p><strong>Trade name:</strong> Geethika</p>
            <p><strong>Phone:</strong> +91 88910 98187</p>
            <p><strong>Email:</strong> support@hairvel.in</p>
            <p>
              <strong>Address:</strong> Building no 4/485, Chakkarakulam,
              Polpully, 678552 Palakkad, Kerala, India
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}