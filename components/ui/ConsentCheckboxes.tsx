'use client';

import { Checkbox } from './checkbox';

interface ConsentCheckboxesProps {
  termsAccepted: boolean;
  dataConsentAccepted: boolean;
  marketingAccepted: boolean;
  onTermsChange: (checked: boolean) => void;
  onDataConsentChange: (checked: boolean) => void;
  onMarketingChange: (checked: boolean) => void;
  onOpenLegalDoc?: (docType: 'offer' | 'privacy') => void;
  className?: string;
}

export function ConsentCheckboxes({
  termsAccepted,
  dataConsentAccepted,
  marketingAccepted,
  onTermsChange,
  onDataConsentChange,
  onMarketingChange,
  onOpenLegalDoc,
  className = '',
}: ConsentCheckboxesProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Terms & Privacy Policy */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms-consent"
          checked={termsAccepted}
          onCheckedChange={(checked) => onTermsChange(checked as boolean)}
          className="mt-0.5 rounded-md data-[state=checked]:bg-[#CBA35A] data-[state=checked]:border-[#CBA35A]"
        />
        <label
          htmlFor="terms-consent"
          className="text-sm text-[#7A5C47] leading-relaxed cursor-pointer"
        >
          Я согласен с{' '}
          <button
            type="button"
            className="text-[#CBA35A] underline hover:text-[#D4A574] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenLegalDoc?.('offer');
            }}
          >
            Условиями и положениями
          </button>{' '}
          и{' '}
          <button
            type="button"
            className="text-[#CBA35A] underline hover:text-[#D4A574] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenLegalDoc?.('privacy');
            }}
          >
            Политикой конфиденциальности
          </button>
          . <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Data Storage Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="data-consent"
          checked={dataConsentAccepted}
          onCheckedChange={(checked) => onDataConsentChange(checked as boolean)}
          className="mt-0.5 rounded-md data-[state=checked]:bg-[#CBA35A] data-[state=checked]:border-[#CBA35A]"
        />
        <label
          htmlFor="data-consent"
          className="text-sm text-[#7A5C47] leading-relaxed cursor-pointer"
        >
          Я согласен на хранение моих данных для бронирования и последующей коммуникации.{' '}
          <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Marketing Consent (Optional) */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="marketing-consent"
          checked={marketingAccepted}
          onCheckedChange={(checked) => onMarketingChange(checked as boolean)}
          className="mt-0.5 rounded-md data-[state=checked]:bg-[#CBA35A] data-[state=checked]:border-[#CBA35A]"
        />
        <label
          htmlFor="marketing-consent"
          className="text-sm text-[#7A5C47] leading-relaxed cursor-pointer"
        >
          Я хочу получать обновления и предложения. (Необязательно)
        </label>
      </div>
    </div>
  );
}
