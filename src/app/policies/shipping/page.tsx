export default function Page() {
  return (
    <div className="min-h-screen bg-card py-16 px-4">
      <div className="max-w-2xl mx-auto text-center py-28">
        
        {/* Title */}
        <h1 className="text-3xl font-medium text-foreground mb-10">
          Shipping policy
        </h1>

        {/* Content */}
        <div className="text-left text-foreground/70 text-sm leading-7 space-y-6">
          
          <p>
            For International buyers, orders are shipped and delivered either
            online or through registered international courier companies and/or
            International speed post only, depending on the product purchased.
          </p>

          <p>
            For domestic buyers, orders are shipped either online or through
            registered domestic courier companies and/or speed post only depending
            on the product purchased. Orders are shipped within 3–5 days or as per
            the delivery date agreed at the time of order confirmation.
          </p>

          <p>
            Geethika Hair Oil is not liable for any delay in delivery by the
            courier company/postal authorities and only guarantees to hand over
            the consignment within 3–5 days from the date of the order.
          </p>

          <p>
            Delivery of all orders will be to the address provided by the buyer.
            Delivery confirmation will be sent via email.
          </p>

          <p>
            For any issues, you may contact our support team.
          </p>

          {/* Contact Info */}
          <div className="pt-6 space-y-2">
            <p><strong>Trade name:</strong> Geethika herbals</p>
            <p><strong>Phone:</strong> +91 9847644412</p>
            <p><strong>Email:</strong> geethikahairoil@gmail.com</p>
            <p>
              <strong>Address:</strong> Earimala, Nayarkuzhi po, Kozhikode, 673601, Kerala, India
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}