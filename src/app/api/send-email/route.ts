import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface EmailPayload {
  customerEmail: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentId: string;
  orderId: string;
}

// ──────────────────────────────────────────────────
// HTML builder helpers
// ──────────────────────────────────────────────────

function buildItemRows(items: OrderItem[]): string {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0ebe4;font-size:14px;color:#3d2b1a;">
          <strong>${item.name}</strong><br/>
          <span style="color:#a08060;font-size:12px;">${item.size} · Qty: ${item.quantity}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #f0ebe4;text-align:right;font-size:14px;color:#3d2b1a;white-space:nowrap;">
          ₹${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");
}

// ──────────────────────────────────────────────────
// Customer confirmation email
// ──────────────────────────────────────────────────
function buildCustomerEmail(p: EmailPayload): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmed – GEETHIKA</title>
</head>
<body style="margin:0;padding:0;background:#fdf8f3;font-family:'Georgia',serif;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#7C5C3E 0%,#5a3e26 100%);">
    <tr>
      <td align="center" style="padding:40px 20px 30px;">
        <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#d4a97a;margin-bottom:8px;">GEETHIKA</p>
        <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:normal;letter-spacing:1px;">Order Confirmed ✨</h1>
        <p style="margin:12px 0 0;color:#d4a97a;font-size:14px;">Thank you for your purchase, ${p.customerName}!</p>
      </td>
    </tr>
  </table>

  <!-- Body -->
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="padding:32px 24px 0;">

        <!-- Success banner -->
        <div style="background:#f0f9f0;border:1px solid #b7dcb7;border-radius:10px;padding:16px 20px;margin-bottom:28px;text-align:center;">
          <p style="margin:0;color:#2d7a2d;font-size:15px;">
            🎉 <strong>Payment Successful!</strong> Your order is being prepared.
          </p>
          <p style="margin:6px 0 0;font-size:12px;color:#4a9a4a;">Payment ID: <strong>${p.paymentId}</strong></p>
        </div>

        <!-- Order items -->
        <h2 style="font-size:16px;font-weight:bold;color:#3d2b1a;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">Your Items</h2>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${buildItemRows(p.items)}
          <tr>
            <td style="padding:10px 0;font-size:13px;color:#7a6050;">Subtotal</td>
            <td style="padding:10px 0;text-align:right;font-size:13px;color:#7a6050;">₹${p.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-size:13px;color:#7a6050;">Shipping</td>
            <td style="padding:4px 0;text-align:right;font-size:13px;color:${p.shipping === 0 ? "#2d7a2d" : "#7a6050"};">
              ${p.shipping === 0 ? "FREE" : `₹${p.shipping.toFixed(2)}`}
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0 0;font-size:18px;font-weight:bold;color:#3d2b1a;border-top:2px solid #e8d9c8;">Total Paid</td>
            <td style="padding:14px 0 0;text-align:right;font-size:18px;font-weight:bold;color:#7C5C3E;border-top:2px solid #e8d9c8;">₹${p.total.toFixed(2)}</td>
          </tr>
        </table>

        <!-- Shipping address -->
        <div style="background:#fff8f2;border:1px solid #e8d9c8;border-radius:10px;padding:20px;margin-top:28px;">
          <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#7C5C3E;">Shipping To</h3>
          <p style="margin:0;font-size:14px;color:#3d2b1a;line-height:1.7;">
            <strong>${p.customerName}</strong><br/>
            ${p.address}<br/>
            ${p.city} – ${p.postalCode}<br/>
            📞 +91 ${p.phone}
          </p>
        </div>

        <!-- Delivery note -->
        <div style="margin-top:24px;padding:16px 20px;background:#fffbf5;border-left:3px solid #7C5C3E;border-radius:4px;">
          <p style="margin:0;font-size:13px;color:#5a3e26;line-height:1.6;">
            🚚 <strong>Estimated Delivery:</strong> 5–7 business days.<br/>
            Our team will reach out via phone/WhatsApp to confirm your delivery slot.
          </p>
        </div>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:36px 24px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#a08060;line-height:1.8;">
          Questions? Reply to this email or WhatsApp us.<br/>
          <strong style="color:#7C5C3E;">GEETHIKA – Premium Herbal Hair Oil</strong>
        </p>
        <p style="margin:12px 0 0;font-size:11px;color:#c4a880;">
          Order ID: ${p.orderId}
        </p>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ──────────────────────────────────────────────────
// Owner notification email
// ──────────────────────────────────────────────────
function buildOwnerEmail(p: EmailPayload): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>New Order – GEETHIKA</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:20px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <tr>
      <td style="background:#7C5C3E;padding:24px 28px;">
        <h1 style="margin:0;font-size:20px;color:#ffffff;">🛍️ New Order Received!</h1>
        <p style="margin:6px 0 0;color:#d4a97a;font-size:13px;">Payment ID: ${p.paymentId}</p>
      </td>
    </tr>

    <tr>
      <td style="padding:28px;">

        <!-- Customer info -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-radius:8px;padding:16px;margin-bottom:24px;">
          <tr><td colspan="2" style="font-size:13px;font-weight:bold;color:#7C5C3E;text-transform:uppercase;letter-spacing:1px;padding-bottom:12px;">Customer Details</td></tr>
          <tr>
            <td style="font-size:13px;color:#666;padding:4px 0;width:110px;">Name</td>
            <td style="font-size:13px;color:#333;font-weight:bold;">${p.customerName}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#666;padding:4px 0;">Email</td>
            <td style="font-size:13px;color:#333;">${p.customerEmail}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#666;padding:4px 0;">Phone</td>
            <td style="font-size:13px;color:#333;">+91 ${p.phone}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#666;padding:4px 0;">Address</td>
            <td style="font-size:13px;color:#333;">${p.address}, ${p.city} – ${p.postalCode}</td>
          </tr>
        </table>

        <!-- Items -->
        <h3 style="margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#333;">Items Ordered</h3>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${buildItemRows(p.items)}
          <tr>
            <td style="padding:12px 0 4px;font-size:13px;color:#888;">Subtotal</td>
            <td style="padding:12px 0 4px;text-align:right;font-size:13px;color:#888;">₹${p.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-size:13px;color:#888;">Shipping</td>
            <td style="padding:4px 0;text-align:right;font-size:13px;color:#888;">${p.shipping === 0 ? "FREE" : `₹${p.shipping.toFixed(2)}`}</td>
          </tr>
          <tr>
            <td style="padding:14px 0 0;font-size:17px;font-weight:bold;color:#222;border-top:2px solid #eee;">💰 Total</td>
            <td style="padding:14px 0 0;text-align:right;font-size:17px;font-weight:bold;color:#7C5C3E;border-top:2px solid #eee;">₹${p.total.toFixed(2)}</td>
          </tr>
        </table>

        <!-- Order meta -->
        <div style="margin-top:24px;padding:14px 18px;background:#f9f9f9;border-radius:8px;font-size:12px;color:#888;line-height:1.8;">
          <strong>Order ID:</strong> ${p.orderId}<br/>
          <strong>Payment ID:</strong> ${p.paymentId}<br/>
          <strong>Date:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>

      </td>
    </tr>

    <tr>
      <td style="background:#f9f9f9;padding:16px 28px;text-align:center;font-size:12px;color:#aaa;">
        GEETHIKA Admin Panel · This is an automated notification
      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ──────────────────────────────────────────────────
// Route handler
// ──────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const payload: EmailPayload = await request.json();

    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      console.error("OWNER_EMAIL env var is not set");
      return NextResponse.json({ error: "Owner email not configured" }, { status: 500 });
    }

    // Send both emails in parallel
    const [customerResult, ownerResult] = await Promise.allSettled([
      resend.emails.send({
        from: "GEETHIKA <onboarding@resend.dev>",
        to: payload.customerEmail,
        subject: `✅ Order Confirmed – ₹${payload.total.toFixed(2)} | GEETHIKA`,
        html: buildCustomerEmail(payload),
      }),
      resend.emails.send({
        from: "GEETHIKA Owner <onboarding@resend.dev>",
        to: ownerEmail,
        subject: `🛍️ New Order ₹${payload.total.toFixed(2)} from ${payload.customerName}`,
        html: buildOwnerEmail(payload),
      }),
    ]);

    const customerOk = customerResult.status === "fulfilled" && !customerResult.value.error;
    const ownerOk = ownerResult.status === "fulfilled" && !ownerResult.value.error;

    if (!customerOk) {
      console.error(
        "Customer email failed:",
        customerResult.status === "fulfilled" ? customerResult.value.error : customerResult.reason
      );
    }
    if (!ownerOk) {
      console.error(
        "Owner email failed:",
        ownerResult.status === "fulfilled" ? ownerResult.value.error : ownerResult.reason
      );
    }

    return NextResponse.json({
      success: true,
      customerEmailSent: customerOk,
      ownerEmailSent: ownerOk,
    });
  } catch (error) {
    console.error("Email route error:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
