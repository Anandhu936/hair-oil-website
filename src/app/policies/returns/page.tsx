export default function Page() {
  return (
    <div className="min-h-screen bg-card py-16 px-4">
      <div className="max-w-2xl mx-auto text-center py-28">

        {/* Title */}
        <h1 className="text-3xl font-medium text-foreground mb-10">
          Return Policy
        </h1>

        {/* Content */}
        <div className="text-left text-foreground/70 text-sm leading-7 space-y-6">

          <p>
            We have a 7-day return policy, which means you have 7 days after
            receiving your item to request a return.
          </p>

          <p>
            To be eligible for a return, your item must be in the same condition
            that you received it, unworn or unused, with tags, and in its
            original packaging. You’ll also need the receipt or proof of
            purchase.
          </p>

          <p>
            To start a return, contact us at <strong>support@Geethika.in</strong>.
            If accepted, our courier partner will pick up the product within
            3 days. Ensure the product is in original packaging with all tags.
          </p>

          <p>
            You can always contact us for any return question at
            <strong> support@Geethika.in</strong>.
          </p>

          {/* Section */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Damages and issues
            </h2>
            <p>
              Inspect your order upon delivery and contact us immediately if the
              item is defective, damaged, or incorrect.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Exceptions / Non-returnable items
            </h2>
            <p>
              Personal care goods (such as hair oil and beauty products) are
              non-returnable due to hygiene and safety reasons.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Exchanges
            </h2>
            <p>
              To exchange, return the item first and place a new order after
              approval.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Refunds
            </h2>
            <p>
              Once approved, refunds are processed within 10 business days to
              your original payment method. It may take additional time for your
              bank to reflect the amount.
            </p>
            <p>
              If more than 15 business days have passed, contact us at
              <strong> support@Geethika.in</strong>.
            </p>
          </div>

          {/* Additional Policy */}
          <p>
            Hair oil products are non-returnable due to hygiene considerations.
            Please review product details carefully before purchase.
          </p>

          <p>
            If you receive a damaged or incorrect product, report it within
            2 days of delivery. Our team will review and take appropriate action.
          </p>

          <p>
            For warranty-related issues, please contact the manufacturer
            directly.
          </p>

          {/* Contact Info */}
          <div className="pt-6 space-y-2">
            <p><strong>Trade name:</strong> Geethika</p>
            <p><strong>Phone:</strong> +91 88910 98187</p>
            <p><strong>Email:</strong> support@Geethika.in</p>
            <p>
              <strong>Address:</strong> Geethika, Building no 4/485,
              Chakkarakulam, Polpully, 678552 Palakkad, Kerala, India
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}