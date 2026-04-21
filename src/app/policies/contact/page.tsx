export default function Page() {
  return (
    <div className="min-h-screen bg-card py-16 px-4">
      <div className="max-w-2xl mx-auto text-center py-28">

        {/* Title */}
        <h1 className="text-3xl font-medium text-foreground mb-10">
          Contact Information
        </h1>

        {/* Content */}
        <div className="text-left text-foreground/70 text-sm leading-7 space-y-6">

          <p>
            If you have any questions, concerns, or need assistance, feel free to reach out to us.
          </p>

          <div className="space-y-3">
            <p><strong>Trade name:</strong> Geethika</p>
            <p><strong>Phone number:</strong> +91 88910 98187</p>
            <p><strong>Email:</strong> support@Geethika.in</p>
            <p>
              <strong>Physical address:</strong> Geethika, Building no 4/485,
              Chakkarakulam, Polpully, 678552 Palakkad, Kerala, India
            </p>
          </div>

          <p>
            Our support team is available Monday to Saturday, 9:00 AM – 6:00 PM.
          </p>

        </div>
      </div>
    </div>
  );
}