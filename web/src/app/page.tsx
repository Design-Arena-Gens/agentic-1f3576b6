"use client";

import { useState } from "react";
import Link from "next/link";

type LeadFormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  timeline: string;
  message: string;
  services: Record<string, boolean>;
};

const services = [
  "AI Calling Agent",
  "Game Development",
  "Mobile App Development",
  "Full-Stack Web Development",
  "Cybersecurity Solutions",
  "Robotic Process Automation",
  "Cloud Computing Solutions",
  "Artificial Intelligence & ML Development",
  "Data Analytics & Business Intelligence",
  "Internet of Things (IoT) Development",
  "VR/AR Solutions",
  "Blockchain Development",
  "AI Chatbot Development",
  "UX/UI Design",
  "Business Automation",
] as const;

const differentiators = [
  {
    title: "Unified Innovation Partner",
    description:
      "From AI agents to immersive experiences, we align cross-disciplinary teams to deliver cohesive, business-ready outcomes.",
  },
  {
    title: "Automation-First Delivery",
    description:
      "We build resilient automation pipelines that increase speed, reduce costs, and eliminate manual friction across the customer journey.",
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Security is embedded into every layer—from cloud infrastructure to data pipelines—keeping your business compliant and protected.",
  },
];

const engagementHighlights = [
  { value: "40%", label: "Average faster go-live" },
  { value: "97%", label: "Client retention rate" },
  { value: "24/7", label: "Managed AI operations" },
  { value: "30+", label: "Specialized delivery experts" },
];

function createInitialFormState(): LeadFormState {
  return {
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    timeline: "",
    message: "",
    services: services.reduce(
      (acc, service) => ({ ...acc, [service]: false }),
      {} as Record<string, boolean>,
    ),
  };
}

export default function Home() {
  const [state, setState] = useState(createInitialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const selectedServices = Object.entries(state.services)
    .filter(([, selected]) => selected)
    .map(([service]) => service);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          company: state.company,
          phone: state.phone,
          budget: state.budget,
          timeline: state.timeline,
          message: state.message,
          interestedServices: selectedServices,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "We couldn't send your request right now.");
      }

      setFeedback({
        type: "success",
        message: "Thanks! We just received your project brief. Expect a tailored response shortly.",
      });
      setState(createInitialFormState());
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        message: "Something went wrong while submitting the form. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4rem] text-slate-400">Alfox.ai</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Agentic acceleration for AI-driven enterprises.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Deploy intelligent calling agents, future-proof digital experiences, and end-to-end automation from one
              partner. Our cross-functional studio transforms bold ideas into measurable growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-cyan-400"
              >
                Launch a project
              </a>
              <Link
                href="#services"
                className="rounded-full border border-slate-700 px-8 py-3 text-sm font-medium uppercase tracking-wide text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Explore capabilities
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-[0_35px_120px_-45px_rgba(6,182,212,0.45)] md:max-w-sm">
            <p className="text-sm uppercase tracking-[0.35rem] text-cyan-400">Latest Launch</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              AI Sales Ops Suite for High-Velocity SaaS Teams
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              Automated lead qualification, outbound call orchestration, and multi-channel follow-ups powered by our
              voice-first agent and RPA stack.
            </p>
            <dl className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between">
                <dt>Live calls automated</dt>
                <dd className="text-white">120K+/month</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sales cycle reduced</dt>
                <dd className="text-white">-32%</dd>
              </div>
              <div className="flex justify-between">
                <dt>Qualified pipeline lift</dt>
                <dd className="text-white">+68%</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-12 grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {engagementHighlights.map((highlight) => (
            <div key={highlight.label} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
              <p className="text-3xl font-semibold text-white">{highlight.value}</p>
              <p className="mt-2 text-sm uppercase tracking-wide text-slate-400">{highlight.label}</p>
            </div>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-24 px-6 pb-24">
        <section id="services" className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4rem] text-cyan-400">Capabilities</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                15 end-to-end services powering intelligent products and operations.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              Blend AI-first automation with immersive experiences, secure cloud-native foundations, and human-centered
              design. Whether you are validating an idea or scaling globally, we plug in as your dedicated innovation
              partner.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-[0_20px_70px_-35px_rgba(6,182,212,0.65)]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">{service}</h3>
                  <p className="mt-3 text-sm text-slate-300">
                    {serviceDescriptions[service as keyof typeof serviceDescriptions]}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  Bespoke delivery blueprint
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <p className="text-sm uppercase tracking-[0.4rem] text-cyan-400">Why Alfox.ai</p>
          <h2 className="text-3xl font-semibold text-white">Human + machine agility built in.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-cyan-400/60"
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[1.2fr_1fr]" id="contact">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.4rem] text-cyan-400">Partner with us</p>
            <h2 className="text-3xl font-semibold text-white">Share your roadmap—we will ship the future with you.</h2>
            <p className="text-slate-300">
              Submit your brief to connect with a solutions architect in under 24 hours. We will map opportunity areas,
              recommend a rapid proof of value, and assemble a delivery pod tuned to your KPIs.
            </p>
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold text-white">What to expect next</h3>
              <ol className="space-y-3 text-sm text-slate-300">
                <li>
                  <span className="font-semibold text-white">1. Discovery call:</span> Align on challenge, goals, and success
                  metrics.
                </li>
                <li>
                  <span className="font-semibold text-white">2. Solution frame:</span> Technical architecture, automation
                  opportunities, and delivery timeline.
                </li>
                <li>
                  <span className="font-semibold text-white">3. Pilot launch:</span> Rapid iteration with measurable ROI before
                  scale up.
                </li>
              </ol>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Response Time</p>
                <p className="text-white">Under 24 hours Mon–Fri</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Preferred Contact</p>
                <p className="text-white">hello@alfox.ai</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Global Delivery</p>
                <p className="text-white">US · Canada · LATAM · Europe</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-cyan-500/40 bg-slate-950/60 p-8 shadow-[0_40px_120px_-60px_rgba(6,182,212,0.8)] backdrop-blur"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white">Request a strategy session</h3>
              <p className="mt-2 text-sm text-slate-300">
                Let us know where you want leverage. We will respond with curated case studies and a tailored plan.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Full Name</span>
                <input
                  required
                  value={state.name}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Alex Fox"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                  type="text"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Work Email</span>
                <input
                  required
                  value={state.email}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  placeholder="alex@company.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                  type="email"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Company</span>
                <input
                  value={state.company}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      company: event.target.value,
                    }))
                  }
                  placeholder="Alfox Labs"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                  type="text"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Phone</span>
                <input
                  value={state.phone}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="+1 (555) 010-7610"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                  type="tel"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Projected Budget</span>
                <select
                  value={state.budget}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      budget: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                >
                  <option value="">Select</option>
                  <option value="<$25k">&lt;$25k</option>
                  <option value="$25k-$75k">$25k-$75k</option>
                  <option value="$75k-$150k">$75k-$150k</option>
                  <option value="$150k-$500k">$150k-$500k</option>
                  <option value="$500k+">$500k+</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Timeline</span>
                <select
                  value={state.timeline}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      timeline: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                >
                  <option value="">Select</option>
                  <option value="ASAP">ASAP</option>
                  <option value="0-3 months">0-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </label>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-xs uppercase tracking-wide text-slate-400">
                Priority initiatives (select all that apply)
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {services.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                      state.services[service]
                        ? "border-cyan-400 bg-cyan-500/10 text-white"
                        : "border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-500/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={state.services[service]}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            [service]: event.target.checked,
                          },
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="space-y-2 text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-400">Project context</span>
              <textarea
                value={state.message}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    message: event.target.value,
                  }))
                }
                placeholder="Tell us about your goals, desired outcomes, and any technical constraints..."
                rows={5}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
              />
            </label>

            {feedback && (
              <p
                className={`rounded-lg px-3 py-2 text-sm ${
                  feedback.type === "success"
                    ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                    : "border border-rose-500/40 bg-rose-500/10 text-rose-100"
                }`}
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || selectedServices.length === 0}
              className="w-full rounded-full bg-cyan-500 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-cyan-400 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit blueprint"}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4rem] text-cyan-400">Custom Integrations</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Plug our agentic stack into your ecosystem—CRM, data warehouse, security tooling, and more.
              </h2>
              <p className="mt-4 text-slate-300">
                We connect with Salesforce, HubSpot, ServiceNow, AWS, Azure, GCP, Snowflake, Databricks, Twilio, Stripe,
                Siemens, Cisco, and 60+ enterprise platforms. Need something proprietary? We will build the connector.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="#contact"
                className="rounded-full border border-cyan-500/70 px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-cyan-300 transition hover:bg-cyan-500/10"
              >
                Architect your integration
              </Link>
              <a
                href="mailto:partnerships@alfox.ai"
                className="rounded-full border border-slate-800 px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-cyan-500/40 hover:text-white"
              >
                partnerships@alfox.ai
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alfox.ai. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wide">
            <Link href="#services" className="transition hover:text-cyan-400">
              Services
            </Link>
            <Link href="#contact" className="transition hover:text-cyan-400">
              Contact
            </Link>
            <a href="mailto:hello@alfox.ai" className="transition hover:text-cyan-400">
              hello@alfox.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const serviceDescriptions = {
  "AI Calling Agent":
    "Voice-native agents that schedule, qualify, and support customers with natural language understanding and compliance-aware workflows.",
  "Game Development":
    "Cross-platform experiences blending storytelling, multiplayer infrastructure, and live ops analytics for sustained engagement.",
  "Mobile App Development":
    "Native and cross-platform apps engineered for performance, retention, and integrated AI-driven personalization.",
  "Full-Stack Web Development":
    "Modern web applications with scalable APIs, real-time collaboration, and resilient cloud deployments.",
  "Cybersecurity Solutions":
    "Proactive security assessments, zero-trust architectures, and automated incident response tailored to your risk posture.",
  "Robotic Process Automation":
    "Workflow automation spanning legacy and modern systems, driving efficiency gains with human-in-the-loop guardrails.",
  "Cloud Computing Solutions":
    "Cloud-native transformations, cost optimization, and reliable infrastructure across AWS, Azure, and Google Cloud.",
  "Artificial Intelligence & ML Development":
    "Production-grade AI models, fine-tuned LLMs, and MLOps pipelines that deliver continuous learning cycles.",
  "Data Analytics & Business Intelligence":
    "Unified data platforms, automated dashboards, and predictive insights that accelerate decision making.",
  "Internet of Things (IoT) Development":
    "Edge-to-cloud IoT architectures with real-time telemetry, remote management, and actionable analytics.",
  "VR/AR Solutions":
    "Immersive training, collaboration, and experiential marketing built with spatial computing best practices.",
  "Blockchain Development":
    "Enterprise blockchain solutions, smart contracts, and token economies with rigorous security and compliance.",
  "AI Chatbot Development":
    "Conversational AI that integrates with knowledge bases, CRMs, and ticketing systems for always-on support.",
  "UX/UI Design":
    "Research-led product design that blends accessibility, brand, and measurable product adoption outcomes.",
  "Business Automation":
    "Process intelligence and automation programs that streamline operations and unlock new revenue channels.",
} as const;
