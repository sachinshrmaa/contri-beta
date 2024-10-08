import { Flex, Text, Button, Card } from "@radix-ui/themes";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function HomePage() {
  return (
    <div>
      <div className="text-center bg-gradient-to-r from-[#E0FFD8] from-17% via-[#95FED8] via-53% to-[#C9FFBC] to-85%">
        <nav className="container mx-auto pt-8">
          <div className="flex justify-between">
            <Text size="5" weight="bold" className="hero-font">
              Contri.
            </Text>

            <div className="flex gap-6">
              <Button size="2" variant="soft" color="orange">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="2" color="orange">
                <Link href="/signup">Get Started</Link>
                <FaArrowRight className="hover:text-lg" />
              </Button>
            </div>
          </div>
        </nav>

        <div className="py-[130px]">
          <Text as="p" className="mb-6 text-5xl w-[750px] mx-auto font-bold hero-font">
            Simplify Shared Expenses with Contri.
          </Text>
          <Text as="p" className="text-lg w-[450px] mx-auto text-slate-700">
            Say goodbye to the hassle of splitting costs among friends and family.
          </Text>

          <div className="flex gap-6 mt-10 justify-center">
            <Button size="3" color="orange">
              <Link href="/signup">Get Started</Link>
              <FaArrowRight className="hover:text-lg" />
            </Button>
            <Button size="3" variant="soft" color="orange">
              <Link href="#plans">View Plan</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="py-20" id="plans">
        <div className="text-center pt-6 pb-16">
          <Text as="div" className="font-semibold text-2xl hero-font mb-3">
            Choose the Plan That Fits Your Needs
          </Text>
          <Text>Flexible pricing options to make expense tracking a breeze.</Text>
        </div>

        <div className="max-w-[700px] mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <Card className="col-span-1 hover:shadow-md hover:bg-green-50">
              <div className="p-6">
                <Text as="div" className="font-semibold text-lg hero-font mb-3">
                  Free Forever
                </Text>
                <div className="mb-6">
                  <p>✔️ Create 3 groups</p>
                  <p>✔️ Add 10 expenses/day</p>
                  <p>✔️ Track payments</p>
                </div>
                <Button size="2" variant="outline">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </Card>
          </div>

          <Card className="col-span-1 shadow-md bg-green-50">
            <div className="p-6">
              <Text as="div" className="font-semibold text-lg hero-font mb-2">
                Premium
              </Text>
              <Text as="div" className="text-md hero-font mb-3">
                ₹ 49/m
              </Text>
              <div className="mb-6">
                <p>✔️ Unlimited groups</p>
                <p>✔️ Unlimited expenses</p>
                <p>✔️ Track payments</p>
                <p>✔️ Premium Support</p>
                <p>✔️ Early access</p>
              </div>
              <Button size="2">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <footer className="py-10 text-center bg-green-100">
        <Text as="div" className="font-semibold text-lg hero-font mb-1">
          Contri.
        </Text>
        <small className="text-slate-400">Build with ❤️ by Sachin in India</small>
        <div className="mt-2">
          <Link href="#" className="text-sm text-green-700 hover:text-green-900 mr-4 underline">
            Terms
          </Link>
          <Link href="#" className="text-sm text-green-700 hover:text-green-900 mr-4 underline">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-green-700 hover:text-green-900 mr-4 underline">
            About
          </Link>
          <Link href="#" className="text-sm text-green-700 hover:text-green-900 mr-4 underline">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
