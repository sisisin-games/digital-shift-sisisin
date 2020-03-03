import { Progress } from './database'

export interface Achievement {
  id: number
  name: string
  description: string
  progress: Progress
}

// prettier-ignore
export const allAchievements: Readonly< Achievement[]> = [
  { id: 100, name: '入門シフター', description: '累計スコア 10 点獲得', progress: { key: 'score', value: 10 } },
  { id: 110, name: '中堅シフター', description: '累計スコア 100 点獲得', progress: { key: 'score', value: 100 } },
  { id: 120, name: '上級シフター', description: '累計スコア 1,000 点獲得', progress: { key: 'score', value: 1_000 } },
  { id: 130, name: '達人シフター', description: '累計スコア 10,000 点獲得', progress: { key: 'score', value: 10_000 } },
  { id: 140, name: '仙人シフター', description: '累計スコア 100,000 点獲得', progress: { key: 'score', value: 100_000 } },
  { id: 150, name: 'マスターシフター', description: '累計スコア 1,000,000 点獲得', progress: { key: 'score', value: 1_000_000 } },

  { id: 200, name: '市ヶ谷をシフト', description: 'シフトを 100 回実行', progress: { key: 'jump', value: 100 } },
  { id: 210, name: '東京をシフト', description: 'シフトを 500 回実行', progress: { key: 'jump', value: 500 } },
  { id: 220, name: '関東をシフト', description: 'シフトを 1,000 回実行', progress: { key: 'jump', value: 1_000 } },
  { id: 230, name: '日本をシフト', description: 'シフトを 5,000 回実行', progress: { key: 'jump', value: 5_000 } },
  { id: 240, name: 'アジアをシフト', description: 'シフトを 10,000 回実行', progress: { key: 'jump', value: 10_000 } },
  { id: 250, name: '地球をシフト', description: 'シフトを 50,000 回実行', progress: { key: 'jump', value: 50_000 } },
  { id: 260, name: '太陽系をシフト', description: 'シフトを 100,000 回実行', progress: { key: 'jump', value: 100_000 } },
  { id: 270, name: '銀河系をシフト', description: 'シフトを 500,000 回実行', progress: { key: 'jump', value: 500_000 } },
  { id: 280, name: '宇宙をシフト', description: 'シフトを 1,000,000 回実行', progress: { key: 'jump', value: 1_000_000 } },

  { id: 300, name: 'ようこそオプトへ', description: 'オプトを 1 個獲得', progress: { key: 'point', value: 1 } },
  { id: 310, name: '零細企業オプト', description: 'オプトを 10 個獲得', progress: { key: 'point', value: 10 } },
  { id: 320, name: '中小企業オプト', description: 'オプトを 100 個獲得', progress: { key: 'point', value: 100 } },
  { id: 330, name: '大企業オプト', description: 'オプトを 1,000 個獲得', progress: { key: 'point', value: 1_000 } },
  { id: 340, name: 'デジタルホールディングス', description: 'オプトを 10,000 個獲得', progress: { key: 'point', value: 10_000 } },
  { id: 350, name: 'デジタルシフトカンパニー', description: 'オプトを 100,000 個獲得', progress: { key: 'point', value: 100_000 } },
  { id: 360, name: '企業価値 1 兆円', description: 'オプトを 1,000,000 個獲得', progress: { key: 'point', value: 1_000_000 } },

  { id: 400, name: '金澤さんのファン', description: '金澤さんを 1 個獲得', progress: { key: 'daisuke', value: 1 } },
  { id: 410, name: '金澤さんマニア', description: '金澤さんを 10 個獲得', progress: { key: 'daisuke', value: 10 } },
  { id: 420, name: '金澤さんコレクター', description: '金澤さんを 100 個獲得', progress: { key: 'daisuke', value: 100 } },
  { id: 430, name: '金澤さん依存症', description: '金澤さんを 1,000 個獲得', progress: { key: 'daisuke', value: 1_000 } },
  { id: 440, name: '一人一人が社長', description: '金澤さんを 10,000 個獲得', progress: { key: 'daisuke', value: 10_000 } },

  { id: 500, name: '鉢嶺さんのファン', description: '鉢嶺さんを 1 個獲得', progress: { key: 'noboru', value: 1 } },
  { id: 510, name: '鉢嶺さんマニア', description: '鉢嶺さんを 10 個獲得', progress: { key: 'noboru', value: 10 } },
  { id: 520, name: '鉢嶺コレクター', description: '鉢嶺さんを 100 個獲得', progress: { key: 'noboru', value: 100 } },
  { id: 530, name: 'その変革に勇気と希望を', description: '鉢嶺さんを 1,000 個獲得', progress: { key: 'noboru', value: 1_000 } },

  { id: 600, name: '届かぬ想い', description: '鉢嶺さんの近くで 1 回ゲームオーバー', progress: { key: 'deadWithNoboru', value: 1 } },
  { id: 610, name: '叶わぬ願い', description: '鉢嶺さんの近くで 3 回ゲームオーバー', progress: { key: 'deadWithNoboru', value: 3 } },
]
