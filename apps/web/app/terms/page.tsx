export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#030303] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">License</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Disapp is free and open-source software licensed under the <strong>GNU General Public License v3.0 (GPL-3.0)</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This means you are free to use, modify, and distribute Disapp, provided that any derivative works are also licensed under GPL-3.0. For the full license text, please visit the{' '}
                <a href="https://github.com/dis-app/disapp/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  LICENSE file
                </a>{' '}
                in our GitHub repository.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using Disapp, accessing our documentation, or downloading our software, you agree to be bound by these Terms of Service and the GPL-3.0 license. If you do not agree to these terms, you may not use Disapp.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use of the Framework</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You may use Disapp to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Build Discord bots for personal or commercial use</li>
                <li>Modify the source code to suit your needs</li>
                <li>Distribute modified versions under GPL-3.0</li>
                <li>Contribute improvements back to the project</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Restrictions</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Use Disapp to create bots that violate Discord's Terms of Service or Community Guidelines</li>
                <li>Use Disapp for illegal activities or to harm others</li>
                <li>Remove or modify license notices from the source code</li>
                <li>Distribute modified versions under a different license (must remain GPL-3.0)</li>
                <li>Use Disapp to create spam bots, harassment tools, or malicious software</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Discord Compliance</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When building bots with Disapp, you must comply with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Discord's Terms of Service</li>
                <li>Discord's Developer Terms of Service</li>
                <li>Discord's Developer Policy</li>
                <li>Discord's Community Guidelines</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Disapp is not affiliated with or endorsed by Discord Inc.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Warranty</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Disapp is provided "as is" without warranty of any kind, express or implied. The developers and contributors of Disapp are not liable for any damages arising from the use of this software. This includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-4">
                <li>Loss of data or profits</li>
                <li>Service interruptions</li>
                <li>Security vulnerabilities</li>
                <li>Discord account suspensions or bans</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, the Disapp developers and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the framework.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Responsibilities</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                As a user of Disapp, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Ensuring your bot complies with all applicable laws and regulations</li>
                <li>Implementing appropriate security measures</li>
                <li>Creating your own privacy policy and terms of service for your bot</li>
                <li>Handling user data responsibly and in compliance with privacy laws</li>
                <li>Maintaining your bot and keeping dependencies up to date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contributions</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By contributing code, documentation, or other materials to Disapp, you agree to license your contributions under GPL-3.0 and grant the project maintainers the right to use, modify, and distribute your contributions as part of the project.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trademark</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "Disapp" and the Disapp logo are trademarks of the Disapp project. You may use these marks to refer to the project, but not in a way that suggests endorsement or affiliation without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These terms remain in effect until terminated. Your rights under the GPL-3.0 license will terminate automatically if you fail to comply with its terms. However, parties who have received copies or rights from you under GPL-3.0 will not have their licenses terminated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of Disapp after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws applicable to open-source software licenses, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For questions about these terms, please open an issue on our{' '}
                <a href="https://github.com/dis-app/disapp" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  GitHub repository
                </a>{' '}
                or join our Discord community.
              </p>
            </section>

            <section className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-3">GPL-3.0 Summary</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                This is a human-readable summary of the GPL-3.0 license. The full license text is legally binding. GPL-3.0 ensures that Disapp remains free and open-source, and that any modifications or derivative works are also shared under the same license. This protects the freedom of all users to use, study, share, and improve the software.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
