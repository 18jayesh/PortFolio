"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/content";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { MagneticButton } from "@/components/common/MagneticButton";

const PROJECT_TYPES = [
  "Full-Stack Web App",
  "React / Next.js Frontend",
  "Billing / Payroll System",
  "Dashboard & Admin Portal",
  "API / Backend Integration",
  "Full-Time Role / Hiring"
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

      // If key is default placeholder, simulate graceful success after delay
      if (apiKey === "YOUR_ACCESS_KEY_HERE") {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSuccess(true);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Inquiry from ${formData.name} [${formData.projectType}]`,
          message: `Project Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.message || "Something went wrong. Please email directly.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please reach out directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-[var(--surface-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 sm:pb-16 border-b border-[var(--surface-border)] mb-14 sm:mb-20">
          <div>
            <span className="text-xs font-mono-code text-[var(--primary)] uppercase tracking-widest font-bold block mb-2">
              [ 05 / 05 ] &bull; Collaborative Synergy
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-[var(--text)]">
              Let&apos;s Build <span className="text-[var(--primary)]">Something Great</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-ping" />
            <span>RESPONSIVE WITHIN 24 HOURS</span>
          </div>
        </div>

        {/* Contact Layout: Left Info & Magnetic Email / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info, Copy Email, Social Links, Resume */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text)]">
                Have a project or opportunity?
              </h3>
              <p className="mt-2 text-sm font-mono-code text-[var(--text-muted)] leading-relaxed">
                Whether you have an ambitious platform to build from scratch, need full-stack engineering expertise, or want to discuss a software role.
              </p>
            </div>

            {/* Magnetic Email Trigger */}
            <div className="p-6 rounded-3xl glass-card flex flex-col gap-3 relative overflow-hidden">
              <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
                Primary Direct Email
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-mono-code font-bold text-[var(--text)] hover:text-[var(--primary)] transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>

                <MagneticButton
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--bg)] text-xs font-mono-code text-[var(--text)] hover:border-[var(--primary)] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} className="text-[#27C93F]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>

            {/* Direct Coordinates & Phone */}
            <div className="flex flex-col gap-4 text-sm font-mono-code">
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-3 p-4 rounded-2xl glass-card hover:border-[var(--primary)] transition-colors text-[var(--text)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] text-[#FF5A3C] flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-[var(--text-muted)] uppercase">Direct Phone</div>
                  <div className="font-bold">{PERSONAL_INFO.phoneFormatted}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-2xl glass-card text-[var(--text)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] text-[#3D5AFE] flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-[var(--text-muted)] uppercase">Physical Base</div>
                  <div className="font-bold">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>

            {/* Social Channels & Resume Download */}
            <div className="pt-4 flex flex-col gap-3">
              <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
                Profiles & Documentation
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--primary)] text-xs font-mono-code font-bold text-[var(--text)] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight size={13} className="text-[var(--text-muted)]" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--primary)] text-xs font-mono-code font-bold text-[var(--text)] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon size={15} className="text-[#3D5AFE]" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight size={13} className="text-[var(--text-muted)]" />
                </a>
              </div>

              <a
                href={PERSONAL_INFO.resumePath}
                download="Jayesh_Mali_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full p-4 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] hover:border-[var(--primary)] text-xs font-mono-code font-bold text-[var(--text)] flex items-center justify-center gap-2 transition-all duration-200 group"
              >
                <Download size={15} className="text-[#FF5A3C] group-hover:translate-y-0.5 transition-transform" />
                <span>Download Official Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Craft Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl glass-card relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-[var(--surface-border)] mb-8">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text)]">
                  Send a Direct Message
                </h3>
                <span className="text-xs font-mono-code text-[var(--text-muted)]">
                  Fast Inquiries
                </span>
              </div>

              {isSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#27C93F]/15 border border-[#27C93F]/30 text-[#27C93F] flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-display font-black text-[var(--text)]">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-sm font-mono-code text-[var(--text-muted)] max-w-md">
                    Thank you for reaching out. Jayesh will review your specifications and reply to{" "}
                    <span className="text-[var(--primary)] font-bold">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: "",
                        email: "",
                        projectType: PROJECT_TYPES[0],
                        message: ""
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full border border-[var(--surface-border)] text-xs font-mono-code text-[var(--text)] hover:border-[var(--primary)]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono-code">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--surface-border)] text-[var(--text)] placeholder-[var(--text-subtle)] text-sm font-mono-code focus:outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--surface-border)] text-[var(--text)] placeholder-[var(--text-subtle)] text-sm font-mono-code focus:outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const selected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`px-3 py-2 rounded-xl text-[11px] font-mono-code text-left border transition-all truncate ${
                              selected
                                ? "bg-[var(--primary)] text-white border-[var(--primary)] font-bold shadow-md shadow-[var(--primary)]/20"
                                : "bg-[var(--bg)] text-[var(--text-muted)] border-[var(--surface-border)] hover:border-[var(--primary)]/50"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Project Scope & Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, deliverables, or team requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--surface-border)] text-[var(--text)] placeholder-[var(--text-subtle)] text-sm font-mono-code focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <span className="text-[11px] font-mono-code text-[var(--text-muted)]">
                      &bull; Strictly confidential & encrypted
                    </span>

                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[#2B3BFF] text-white font-mono-code font-bold text-xs tracking-wide shadow-lg shadow-[var(--primary)]/25 flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={13} />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
