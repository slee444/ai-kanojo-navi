import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-pink-600">
          AI彼女ナビ
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/articles" className="text-gray-600 hover:text-gray-900">
            記事一覧
          </Link>
          <Link href="/reviews" className="text-gray-600 hover:text-gray-900">
            レビュー
          </Link>
          <Link href="/compare" className="text-gray-600 hover:text-gray-900">
            比較
          </Link>
        </nav>
      </div>
    </header>
  );
}
