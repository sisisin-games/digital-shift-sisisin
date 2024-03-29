import { shuffle } from './common'

const quotes = [
  '日本全国の企業のデジタルシフトをリードする株式会社オプトホールディング',
  '商号を「株式会社デジタルホールディングス」に変更することを決議',
  'デジタル産業革命は勢いを増し、社会やお客様を取り巻く環境が日々変化',
  'インターネット広告代理事業だけには留まらない“あらゆるデジタルシフト”に対応',
  '社会や企業の繁栄のための課題',
  'デジタルプロフェッショナル人材の育成',
  'デジタルを活用した新規事業の開発',
  '企業全体のデジタル化を全面的にサポート',
  '主事業を「インターネット広告代理事業」から「デジタルシフト事業」へ',
  '新戦略・経営体制によりデジタルシフト事業を拡大',
  '2030 年に企業価値を 1 兆円とすることを新たな目標',
  '“デジタルシフトカンパニー”として更なる発展',
  '多様化するデジタルビジネスに対応',
  '象徴ともいえる商号を今回「株式会社デジタルホールディングス」に変更',
]

let currentIndex = 0

export function getRandomQuoteText() {
  if (!currentIndex) {
    shuffle(quotes)
  }
  const next = quotes[currentIndex]
  currentIndex = (currentIndex + 1) % quotes.length
  return next
}
