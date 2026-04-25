export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#030303] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Disapp is an open-source Discord bot framework licensed under GPL-3.0. This privacy policy explains how we handle information when you use our framework, documentation website, and related services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                As an open-source framework, Disapp itself does not collect any personal data. However, our documentation website may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Anonymous usage statistics through standard web analytics</li>
                <li>Technical information such as browser type, device type, and IP address</li>
                <li>Cookies for website functionality and user preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Any information collected is used solely to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Improve the documentation and user experience</li>
                <li>Understand how users interact with our website</li>
                <li>Maintain and optimize website performance</li>
                <li>Provide technical support when requested</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bots Built with Disapp</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When you build a Discord bot using Disapp, you are responsible for your bot's data collection and privacy practices. Disapp provides tools and features, but does not control how you implement them. You must create your own privacy policy for your bot and comply with Discord's Terms of Service and Developer Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our documentation website may use third-party services such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>GitHub for hosting and version control</li>
                <li>NPM for package distribution</li>
                <li>Analytics services for usage statistics</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                These services have their own privacy policies and terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement reasonable security measures to protect any information collected through our website. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Open Source Nature</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Disapp is open-source software licensed under GPL-3.0. The source code is publicly available on GitHub. You can review, modify, and distribute the code according to the license terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Access any personal information we may have collected</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of analytics tracking</li>
                <li>Use the framework without providing any personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have questions about this privacy policy, please open an issue on our GitHub repository or contact us through our Discord community.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
