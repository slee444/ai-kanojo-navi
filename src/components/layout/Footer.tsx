export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500 flex gap-6">
        <span>© 2025 AI彼女ナビ</span>
        <a href="/privacy" className="hover:text-gray-700">プライバシーポリシー</a>
        <a href="/disclaimer" className="hover:text-gray-700">免責事項</a>
      </div>
    </footer>
  );
}
