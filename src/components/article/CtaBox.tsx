type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
  note?: string;
};

export default function CtaBox({ title, description, buttonLabel, href, note }: Props) {
  return (
    <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 text-center">
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block bg-pink-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-pink-700 transition-colors"
        >
          {buttonLabel}
        </a>
      ) : (
        <span className="inline-block bg-gray-200 text-gray-400 text-sm font-medium px-5 py-2.5 rounded-lg cursor-not-allowed">
          {buttonLabel}
        </span>
      )}
      {note && <p className="text-xs text-gray-400 mt-3">{note}</p>}
    </div>
  );
}
