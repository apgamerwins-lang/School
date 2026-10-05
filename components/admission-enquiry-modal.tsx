'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, Mail, FileText, ArrowRight, Printer, Copy, Check } from 'lucide-react';

interface AdmissionEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionEnquiryModal({ isOpen, onClose }: AdmissionEnquiryModalProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    grade: 'Grade 1',
    previousSchool: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    submittedAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent or guardian name is required';

    const cleanedPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = 'Please provide a valid 10-digit Indian phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `SMSJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionResult({
        referenceId: generatedRef,
        submittedAt: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopyRef = () => {
    if (submissionResult) {
      navigator.clipboard.writeText(submissionResult.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1622]/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#0F2030] rounded-xl shadow-2xl border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 p-6 sm:p-8 my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#475B6E] hover:text-[#0F2030] dark:text-[#C8D9E8] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3F8] dark:hover:bg-[#172F44] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submissionResult ? (
          /* Confirmation State */
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#28624E] dark:text-[#388E6C]">
              <CheckCircle2 className="w-8 h-8 shrink-0 text-[#89ACC7]" />
              <div>
                <h3 id="modal-headline" className="font-serif text-2xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                  Enquiry Registered Successfully
                </h3>
                <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8]">
                  St. Mary&apos;s High School, Rowriah, Jorhat · Academic Session 2026–27
                </p>
              </div>
            </div>

            {/* Official Voucher Card in Victory Light Blue */}
            <div className="bg-[#EBF3F8] dark:bg-[#0A1622] p-5 rounded-lg border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#89ACC7]/20 dark:border-[#DCE8F2]/20 gap-2">
                <div>
                  <span className="text-[#475B6E] dark:text-[#C8D9E8] uppercase tracking-wider block text-[10px]">Reference Number</span>
                  <span className="font-bold text-sm text-[#0F2030] dark:text-[#DCE8F2]">
                    {submissionResult.referenceId}
                  </span>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-white dark:bg-[#0F2030] border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 rounded text-[#0F2030] dark:text-[#FAF8F5] hover:bg-[#DCE8F2] dark:hover:bg-[#172F44] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#28624E] dark:text-[#388E6C]" /> : <Copy className="w-3.5 h-3.5 text-[#89ACC7]" />}
                  <span>{copied ? 'Copied' : 'Copy Ref'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[#0F2030] dark:text-[#FAF8F5] text-[11px]">
                <div>
                  <span className="text-[#475B6E] dark:text-[#C8D9E8] block text-[10px]">Student Name:</span>
                  <span className="font-semibold">{formData.studentName}</span>
                </div>
                <div>
                  <span className="text-[#475B6E] dark:text-[#C8D9E8] block text-[10px]">Applied For:</span>
                  <span className="font-semibold">{formData.grade}</span>
                </div>
                <div>
                  <span className="text-[#475B6E] dark:text-[#C8D9E8] block text-[10px]">Parent/Guardian:</span>
                  <span>{formData.parentName}</span>
                </div>
                <div>
                  <span className="text-[#475B6E] dark:text-[#C8D9E8] block text-[10px]">Contact:</span>
                  <span>{formData.phone}</span>
                </div>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div className="space-y-3 text-sm text-[#0F2030] dark:text-[#FAF8F5]">
              <h4 className="font-serif font-semibold text-[#0F2030] dark:text-[#FAF8F5] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#89ACC7]" />
                Next Steps for Parents:
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed pl-1">
                <li>Note down or print your reference number <strong>{submissionResult.referenceId}</strong>.</li>
                <li>Visit the School Administrative Office in Jamuguri, Rowriah, Jorhat during working hours (8:00 AM – 2:00 PM, Monday to Saturday).</li>
                <li>Bring verified original certificates (Birth Certificate, previous class marksheet, transfer certificate).</li>
                <li>For any immediate assistance, contact the admission helpline directly below.</li>
              </ol>
            </div>

            {/* Direct Contact Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#89ACC7]/20 dark:border-[#DCE8F2]/20">
              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href="tel:+918133966530"
                  className="flex items-center gap-1.5 text-[#0F2030] dark:text-[#FAF8F5] hover:underline font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#89ACC7]" />
                  +91 81339 66530
                </a>
                <a
                  href="mailto:stmarysjorhat@gmail.com"
                  className="flex items-center gap-1.5 text-[#475B6E] dark:text-[#C8D9E8] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-[#89ACC7]" />
                  Office Desk
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 rounded text-[#0F2030] dark:text-[#FAF8F5] hover:bg-[#EBF3F8] dark:hover:bg-[#172F44] transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-[#89ACC7]" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs font-semibold bg-[#0F2030] text-[#FAF8F5] hover:bg-[#172F44] dark:bg-[#DCE8F2] dark:text-[#0F2030] dark:hover:bg-[#C8DFF0] rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form Input State */
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#89ACC7] dark:text-[#DCE8F2] block mb-1 font-semibold">
                Academic Session 2026–2027
              </span>
              <h3 id="modal-headline" className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                Official Admission Enquiry
              </h3>
              <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] mt-1.5 leading-relaxed">
                Submit candidate details for preliminary evaluation. The admissions desk will reach out within two working days with prospectus and verification schedule.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                    Student Full Name <span className="text-[#963548]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Candidate's full name"
                    className={`w-full px-3 py-2 text-xs rounded-md border ${
                      errors.studentName
                        ? 'border-[#963548] focus:ring-[#963548]'
                        : 'border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 focus:ring-[#89ACC7]'
                    } bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2`}
                  />
                  {errors.studentName && (
                    <p className="text-[11px] text-[#963548] mt-1">{errors.studentName}</p>
                  )}
                </div>

                {/* Parent / Guardian Name */}
                <div>
                  <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                    Parent / Guardian Name <span className="text-[#963548]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Father's / Mother's name"
                    className={`w-full px-3 py-2 text-xs rounded-md border ${
                      errors.parentName
                        ? 'border-[#963548] focus:ring-[#963548]'
                        : 'border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 focus:ring-[#89ACC7]'
                    } bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2`}
                  />
                  {errors.parentName && (
                    <p className="text-[11px] text-[#963548] mt-1">{errors.parentName}</p>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                    Contact Mobile Number <span className="text-[#963548]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-[#728495] font-mono">+91</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="81339 00000"
                      className={`w-full pl-10 pr-3 py-2 text-xs rounded-md border ${
                        errors.phone
                          ? 'border-[#963548] focus:ring-[#963548]'
                          : 'border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 focus:ring-[#89ACC7]'
                      } bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2 font-mono`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-[#963548] mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                    Email Address <span className="text-[#963548]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="guardian@example.com"
                    className={`w-full px-3 py-2 text-xs rounded-md border ${
                      errors.email
                        ? 'border-[#963548] focus:ring-[#963548]'
                        : 'border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 focus:ring-[#89ACC7]'
                    } bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#963548] mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Grade Seeking Admission */}
                <div>
                  <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                    Grade Seeking Admission <span className="text-[#963548]">*</span>
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2 focus:ring-[#89ACC7]"
                  >
                    {[
                      'Grade 1 (Primary)',
                      'Grade 2',
                      'Grade 3',
                      'Grade 4',
                      'Grade 5',
                      'Grade 6 (Middle)',
                      'Grade 7',
                      'Grade 8',
                      'Grade 9 (Secondary)',
                      'Grade 10 (SEBA Board)',
                    ].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Previous School */}
                <div>
                  <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                    Previous School Attended (if any)
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="Name of school & town"
                    className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2 focus:ring-[#89ACC7]"
                  />
                </div>
              </div>

              {/* Remarks / Message */}
              <div>
                <label className="block text-xs font-medium text-[#0F2030] dark:text-[#FAF8F5] mb-1">
                  Specific Questions or Remarks
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention any queries regarding transportation, medium of instruction, or documentation..."
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/30 dark:border-[#DCE8F2]/20 bg-white dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] focus:outline-hidden focus:ring-2 focus:ring-[#89ACC7]"
                />
              </div>

              {/* Submission Footer */}
              <div className="pt-3 border-t border-[#89ACC7]/20 dark:border-[#DCE8F2]/20 flex items-center justify-between">
                <div className="text-[11px] text-[#475B6E] dark:text-[#C8D9E8] font-mono">
                  Direct Office Desk: +91 81339 66530
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs text-[#475B6E] dark:text-[#C8D9E8] hover:text-[#0F2030] dark:hover:text-[#FAF8F5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0F2030] bg-[#DCE8F2] hover:bg-[#C8DFF0] rounded-md transition-colors shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0F2030]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
