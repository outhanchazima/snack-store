import { motion } from "framer-motion";
import { Package2, Truck, HeartHandshake, Shield } from "lucide-react";

const features = [
  {
    icon: Package2,
    title: "Premium Selection",
    description:
      "We carefully curate our snacks to ensure only the highest quality products make it to your doorstep.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Enjoy quick and reliable delivery service to satisfy your snack cravings.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We're here to help with any questions or concerns.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description:
      "Shop with confidence knowing your personal information is protected.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About SnackBox</h1>
        <p className="text-lg text-muted-foreground">
          We're passionate about delivering the best snacking experience to our
          customers. Our journey began with a simple idea: everyone deserves access
          to premium, delicious snacks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg border bg-card"
            >
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2024, SnackBox has grown from a small local business to a
            trusted name in premium snacks. We work directly with producers and
            manufacturers to bring you the best selection of snacks from around the
            world.
          </p>
          <p className="text-muted-foreground">
            Our commitment to quality and customer satisfaction has helped us build
            a loyal community of snack enthusiasts who trust us for their snacking
            needs.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-video rounded-lg overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=800"
            alt="Our workspace"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-8">
          Be part of our growing community of snack lovers. Follow us on social
          media for the latest updates, special offers, and snack inspiration.
        </p>
        <div className="flex justify-center space-x-4">
          {/* Add social media links here */}
        </div>
      </div>
    </div>
  );
}