/* 簡單學英文 · 30 單元課程內容
   每單元：一段情境對話（A = 浣浣，B = 情境角色），8 個重點單字都會出現在對話裡。
   words: [英文, 中文, 圖示]；lines: [說話者, 英文, 中文] */
window.COURSE = [
  { id: 1, topic: 'daily', title: '打招呼', en: 'Greetings', scene: '🏡', place: '早上在家門口', npc: { name: '鄰居 Amy', face: '👩' },
    words: [['hello', '哈囉', '🙋'], ['good morning', '早安', '🌅'], ['how are you', '你好嗎', '😊'], ['fine', '很好的', '👌'], ['thank you', '謝謝你', '🙏'], ['please', '請；麻煩你', '🤲'], ['yes', '是的；好', '✅'], ['goodbye', '再見', '👋']],
    lines: [['B', 'Hello! Good morning!', '哈囉！早安！'], ['A', 'Good morning, Amy! How are you?', '早安，Amy！你好嗎？'], ['B', 'I am fine, thank you.', '我很好，謝謝你。'], ['A', 'Do you want some coffee?', '你想喝點咖啡嗎？'], ['B', 'Yes, please!', '好，麻煩你！'], ['A', 'Here you are.', '給你。'], ['B', 'Thank you! Goodbye!', '謝謝你！再見！']] },

  { id: 2, topic: 'daily', title: '自我介紹', en: 'Introductions', scene: '🎉', place: '朋友的聚會', npc: { name: '新朋友 Tom', face: '🧑' },
    words: [['name', '名字', '📛'], ['nice', '很好的；高興的', '👍'], ['meet', '認識；見面', '🤝'], ['friend', '朋友', '👫'], ['from', '來自', '📍'], ['Taiwan', '台灣', '🏝️'], ['live', '住', '🏠'], ['student', '學生', '🎒']],
    lines: [['B', 'Hi! My name is Tom.', '嗨！我的名字是 Tom。'], ['A', 'Nice to meet you, Tom.', '很高興認識你，Tom。'], ['B', 'This is my friend, Amy.', '這是我的朋友 Amy。'], ['A', 'Hello, Amy!', '哈囉，Amy！'], ['B', 'Where are you from?', '你來自哪裡？'], ['A', 'I am from Taiwan.', '我來自台灣。'], ['B', 'Do you live in Taipei?', '你住在台北嗎？'], ['A', 'Yes. I am a student.', '是的。我是學生。']] },

  { id: 3, topic: 'daily', title: '數字', en: 'Numbers', scene: '🍎', place: '水果攤', npc: { name: '水果攤老闆', face: '👨‍🌾' },
    words: [['one', '一', '1️⃣'], ['two', '二', '2️⃣'], ['three', '三', '3️⃣'], ['four', '四', '4️⃣'], ['five', '五', '5️⃣'], ['six', '六', '6️⃣'], ['ten', '十', '🔟'], ['how many', '多少個', '🔢']],
    lines: [['B', 'Hello! How many apples?', '哈囉！要幾顆蘋果？'], ['A', 'Three apples, please.', '三顆蘋果，麻煩你。'], ['B', 'OK. One, two, three.', '好的。一、二、三。'], ['A', 'And four bananas.', '還有四根香蕉。'], ['B', 'Anything else?', '還要別的嗎？'], ['A', 'Five eggs and six lemons.', '五顆蛋和六顆檸檬。'], ['B', 'That is ten dollars.', '這樣是十元。']] },

  { id: 4, topic: 'daily', title: '家人', en: 'Family', scene: '📷', place: '一起看相簿', npc: { name: '朋友 Amy', face: '👩' },
    words: [['photo', '照片', '📷'], ['family', '家人', '👨‍👩‍👧'], ['mother', '媽媽', '👩'], ['father', '爸爸', '👨'], ['sister', '姊妹；姊姊或妹妹', '👧'], ['brother', '兄弟；哥哥或弟弟', '👦'], ['baby', '寶寶', '👶'], ['cute', '可愛的', '🥰']],
    lines: [['A', 'Look at this photo. This is my family.', '你看這張照片。這是我的家人。'], ['B', 'Is this your mother?', '這是你的媽媽嗎？'], ['A', 'Yes, and this is my father.', '對，這是我的爸爸。'], ['B', 'Who is this girl?', '這個女孩是誰？'], ['A', 'She is my sister.', '她是我的姊妹。'], ['B', 'Do you have a brother?', '你有兄弟嗎？'], ['A', 'Yes. He has a baby.', '有。他有一個寶寶。'], ['B', 'The baby is so cute!', '寶寶好可愛！']] },

  { id: 5, topic: 'daily', title: '顏色與衣服', en: 'Colors & Clothes', scene: '🛍️', place: '服飾店', npc: { name: '店員', face: '👩‍💼' },
    words: [['blue', '藍色', '🔵'], ['shirt', '襯衫', '👕'], ['red', '紅色', '🔴'], ['white', '白色', '⚪'], ['black', '黑色', '⚫'], ['shoes', '鞋子', '👟'], ['hat', '帽子', '👒'], ['jacket', '外套', '🧥']],
    lines: [['B', 'Hello! Can I help you?', '哈囉！需要幫忙嗎？'], ['A', 'I like this blue shirt.', '我喜歡這件藍色襯衫。'], ['B', 'We also have red and white.', '我們也有紅色和白色。'], ['A', 'Do you have black shoes?', '你們有黑色的鞋子嗎？'], ['B', 'Yes. How about this hat?', '有的。這頂帽子怎麼樣？'], ['A', 'It is nice. And this jacket?', '很好看。那這件外套呢？'], ['B', 'The jacket is on sale today.', '這件外套今天特價。']] },

  { id: 6, topic: 'daily', title: '時間與星期', en: 'Time & Days', scene: '📅', place: '辦公室', npc: { name: '同事 Ben', face: '👨‍💼' },
    words: [['what time', '幾點', '⏰'], ['morning', '早上', '🌄'], ['today', '今天', '📅'], ['Monday', '星期一', '🗓️'], ['Friday', '星期五', '🎉'], ['weekend', '週末', '🏖️'], ['tomorrow', '明天', '➡️'], ['night', '晚上', '🌙']],
    lines: [['A', 'What time is it?', '現在幾點？'], ['B', 'It is nine in the morning.', '現在是早上九點。'], ['A', 'Is today Monday?', '今天是星期一嗎？'], ['B', 'No, today is Friday!', '不是，今天是星期五！'], ['A', 'Great! The weekend is tomorrow.', '太好了！明天就是週末。'], ['B', 'Let\'s see a movie on Saturday night.', '我們星期六晚上去看電影吧。']] },

  { id: 7, topic: 'daily', title: '食物與飲料', en: 'Food & Drinks', scene: '🍽️', place: '中午吃飯', npc: { name: '朋友 Amy', face: '👩' },
    words: [['hungry', '餓的', '😋'], ['rice', '飯', '🍚'], ['noodles', '麵', '🍜'], ['chicken', '雞肉', '🍗'], ['tea', '茶', '🍵'], ['water', '水', '💧'], ['bread', '麵包', '🍞'], ['apple', '蘋果', '🍎']],
    lines: [['A', 'I am hungry.', '我肚子餓了。'], ['B', 'Do you want rice or noodles?', '你想吃飯還是麵？'], ['A', 'Noodles with chicken, please.', '請給我雞肉麵。'], ['B', 'Do you want some tea?', '你要喝點茶嗎？'], ['A', 'Just water, thank you.', '開水就好，謝謝。'], ['B', 'Have some bread and an apple.', '吃點麵包和一顆蘋果吧。']] },

  { id: 8, topic: 'daily', title: '在咖啡店', en: 'At the Café', scene: '☕', place: '咖啡店', npc: { name: '店員', face: '🧑‍🍳' },
    words: [['menu', '菜單', '📋'], ['coffee', '咖啡', '☕'], ['hot', '熱的', '🔥'], ['iced', '冰的', '🧊'], ['milk', '牛奶', '🥛'], ['sugar', '糖', '🍬'], ['large', '大的', '🥤'], ['to go', '外帶', '🛍️']],
    lines: [['A', 'Can I see the menu?', '我可以看一下菜單嗎？'], ['B', 'Sure. What would you like?', '當然。你想要什麼？'], ['A', 'One coffee, please.', '請給我一杯咖啡。'], ['B', 'Hot or iced?', '熱的還是冰的？'], ['A', 'Iced, with milk. No sugar.', '冰的，加牛奶。不要糖。'], ['B', 'Small or large?', '小杯還是大杯？'], ['A', 'Large, please.', '大杯，麻煩你。'], ['B', 'For here or to go?', '內用還是外帶？'], ['A', 'To go, please.', '外帶，麻煩你。']] },

  { id: 9, topic: 'travel', title: '機場報到', en: 'Airport Check-in', scene: '🛫', place: '機場報到櫃檯', npc: { name: '地勤人員', face: '👩‍✈️' },
    words: [['passport', '護照', '🛂'], ['ticket', '票；機票', '🎫'], ['flight', '班機', '✈️'], ['luggage', '行李', '🧳'], ['bag', '袋子；一件行李', '👜'], ['window seat', '靠窗座位', '🪟'], ['boarding pass', '登機證', '🎟️'], ['gate', '登機門', '🚪']],
    lines: [['B', 'Good morning. Passport and ticket, please.', '早安。請給我護照和機票。'], ['A', 'Here you are.', '給你。'], ['B', 'Your flight is to Tokyo.', '你的班機是飛往東京。'], ['B', 'Do you have any luggage?', '你有行李嗎？'], ['A', 'Yes, one bag.', '有，一件。'], ['A', 'Can I have a window seat?', '我可以坐靠窗的位子嗎？'], ['B', 'Sure. Here is your boarding pass.', '沒問題。這是你的登機證。'], ['B', 'Please go to gate twelve.', '請到十二號登機門。']] },

  { id: 10, topic: 'travel', title: '在飛機上', en: 'On the Plane', scene: '✈️', place: '飛機上', npc: { name: '空服員', face: '🧑‍✈️' },
    words: [['seat', '座位', '💺'], ['blanket', '毯子', '🛌'], ['pillow', '枕頭', '🛏️'], ['meal', '餐點', '🍱'], ['beef', '牛肉', '🥩'], ['fish', '魚', '🐟'], ['juice', '果汁', '🧃'], ['bathroom', '洗手間', '🚻']],
    lines: [['B', 'Welcome. Here is your seat.', '歡迎。這是您的座位。'], ['A', 'Thank you. Can I have a blanket?', '謝謝。可以給我一條毯子嗎？'], ['B', 'Sure. Here is a pillow too.', '當然。也給您一個枕頭。'], ['B', 'It is meal time. Beef or fish?', '用餐時間到了。牛肉還是魚？'], ['A', 'Fish, please. And some juice.', '魚，麻煩你。還有一些果汁。'], ['A', 'Where is the bathroom?', '洗手間在哪裡？'], ['B', 'It is at the back.', '在後面。']] },

  { id: 11, topic: 'daily', title: '購物', en: 'Shopping', scene: '🏬', place: '百貨公司', npc: { name: '店員', face: '👩‍💼' },
    words: [['how much', '多少錢', '💰'], ['price', '價格', '🏷️'], ['expensive', '貴的', '💸'], ['cheap', '便宜的', '🪙'], ['try', '試；試穿', '👗'], ['size', '尺寸', '📏'], ['card', '卡；信用卡', '💳'], ['cash', '現金', '💵']],
    lines: [['A', 'How much is this dress?', '這件洋裝多少錢？'], ['B', 'The price is ninety dollars.', '價格是九十元。'], ['A', 'That is expensive.', '那很貴。'], ['B', 'This one is cheap. Only thirty.', '這件很便宜。只要三十。'], ['A', 'Can I try it on?', '我可以試穿嗎？'], ['B', 'Sure. What size do you need?', '當然。你需要什麼尺寸？'], ['A', 'Medium. Can I pay by card?', '中號。我可以刷卡嗎？'], ['B', 'Sorry, cash only.', '抱歉，只收現金。']] },

  { id: 12, topic: 'travel', title: '入境與海關', en: 'Immigration', scene: '🛂', place: '入境櫃檯', npc: { name: '海關人員', face: '👮' },
    words: [['visit', '來訪；拜訪', '🗺️'], ['holiday', '假期', '🏖️'], ['business', '商務', '💼'], ['first time', '第一次', '🥇'], ['stay', '停留', '🛎️'], ['days', '天', '📆'], ['hotel', '飯店', '🏨'], ['declare', '申報', '📝']],
    lines: [['B', 'What is the purpose of your visit?', '你來訪的目的是什麼？'], ['A', 'I am here on holiday.', '我來這裡度假。'], ['B', 'Not business?', '不是商務？'], ['A', 'No. It is my first time here.', '不是。這是我第一次來這裡。'], ['B', 'How long will you stay?', '你會停留多久？'], ['A', 'Five days, at a hotel.', '五天，住在飯店。'], ['B', 'Anything to declare?', '有東西要申報嗎？'], ['A', 'No, nothing.', '沒有，什麼都沒有。']] },

  { id: 13, topic: 'daily', title: '天氣', en: 'Weather', scene: '⛅', place: '出門前', npc: { name: '室友 Amy', face: '👩' },
    words: [['weather', '天氣', '🌤️'], ['cloudy', '多雲的', '☁️'], ['windy', '颳風的', '💨'], ['cold', '冷的', '🥶'], ['warm', '溫暖的；保暖的', '🧣'], ['rainy', '下雨的', '🌧️'], ['umbrella', '雨傘', '☂️'], ['sunny', '晴朗的', '☀️']],
    lines: [['A', 'How is the weather today?', '今天天氣如何？'], ['B', 'It is cloudy and windy.', '多雲而且颳風。'], ['A', 'Is it cold outside?', '外面冷嗎？'], ['B', 'A little. Take a warm jacket.', '有一點。帶件保暖的外套。'], ['B', 'It may be rainy later. Take your umbrella.', '晚點可能會下雨。帶上你的雨傘。'], ['A', 'OK. I hope tomorrow is sunny!', '好。希望明天是晴天！']] },

  { id: 14, topic: 'travel', title: '搭計程車', en: 'Taking a Taxi', scene: '🚕', place: '計程車上', npc: { name: '司機', face: '🧔' },
    words: [['taxi', '計程車', '🚕'], ['airport', '機場', '🛫'], ['address', '地址', '📮'], ['how long', '多久', '⏱️'], ['stop', '停下', '🛑'], ['station', '車站', '🚉'], ['left', '左邊', '⬅️'], ['right', '右邊', '➡️']],
    lines: [['A', 'Taxi!', '計程車！'], ['B', 'Hello. Where to?', '你好。要去哪裡？'], ['A', 'Please take me to this address.', '請載我到這個地址。'], ['B', 'OK. It is near the airport.', '好的。這在機場附近。'], ['A', 'How long will it take?', '要多久時間？'], ['B', 'About thirty minutes.', '大約三十分鐘。'], ['A', 'Please stop at the station first.', '請先在車站停一下。'], ['B', 'Sure. Is it on the left or right?', '好的。在左邊還是右邊？'], ['A', 'It is on the right.', '在右邊。']] },

  { id: 15, topic: 'travel', title: '搭大眾運輸', en: 'Public Transport', scene: '🚆', place: '火車站售票口', npc: { name: '站務員', face: '👷' },
    words: [['ticket', '票；車票', '🎫'], ['one-way', '單程的', '➡️'], ['round trip', '來回', '🔁'], ['next', '下一個', '⏭️'], ['train', '火車', '🚆'], ['platform', '月台', '🛤️'], ['bus', '公車', '🚌'], ['subway', '地鐵', '🚇']],
    lines: [['A', 'One ticket to Taipei, please.', '請給我一張到台北的票。'], ['B', 'One-way or round trip?', '單程還是來回？'], ['A', 'Round trip, please.', '來回，麻煩你。'], ['A', 'When is the next train?', '下一班火車是什麼時候？'], ['B', 'At ten. Go to platform three.', '十點。請到第三月台。'], ['A', 'Is there a bus or subway to the hotel?', '有公車或地鐵到飯店嗎？'], ['B', 'Yes, take the subway.', '有，搭地鐵。']] },

  { id: 16, topic: 'travel', title: '問路', en: 'Asking for Directions', scene: '🗺️', place: '街上', npc: { name: '路人', face: '👵' },
    words: [['excuse me', '不好意思', '🙋'], ['lost', '迷路的', '😵'], ['how do I get to', '怎麼去', '🧭'], ['go straight', '直走', '⬆️'], ['turn left', '左轉', '↩️'], ['corner', '轉角', '📐'], ['far', '遠的', '🚶'], ['map', '地圖', '🗺️']],
    lines: [['A', 'Excuse me. I am lost.', '不好意思。我迷路了。'], ['B', 'Can I help you?', '需要幫忙嗎？'], ['A', 'How do I get to the museum?', '請問博物館怎麼去？'], ['B', 'Go straight and turn left.', '直走然後左轉。'], ['B', 'It is on the corner.', '它在轉角。'], ['A', 'Is it far?', '很遠嗎？'], ['B', 'No, it is not far. Look at this map.', '不遠。你看這張地圖。']] },

  { id: 17, topic: 'daily', title: '興趣', en: 'Hobbies', scene: '🎨', place: '喝茶聊天', npc: { name: '朋友 Tom', face: '🧑' },
    words: [['hobby', '興趣', '🎯'], ['music', '音樂', '🎵'], ['movies', '電影', '🎬'], ['books', '書', '📚'], ['sports', '運動', '⚽'], ['swim', '游泳', '🏊'], ['cook', '做菜', '🍳'], ['travel', '旅行', '🌏']],
    lines: [['B', 'What is your hobby?', '你的興趣是什麼？'], ['A', 'I like music and movies.', '我喜歡音樂和電影。'], ['B', 'Do you read books?', '你會看書嗎？'], ['A', 'Yes. Do you like sports?', '會啊。你喜歡運動嗎？'], ['B', 'I swim every morning.', '我每天早上游泳。'], ['A', 'I like to cook and travel.', '我喜歡做菜和旅行。']] },

  { id: 18, topic: 'travel', title: '飯店入住', en: 'Hotel Check-in', scene: '🏨', place: '飯店櫃檯', npc: { name: '櫃檯人員', face: '🧑‍💼' },
    words: [['check in', '入住', '🛎️'], ['reservation', '預約', '📋'], ['room', '房間', '🛏️'], ['floor', '樓層', '🏢'], ['key', '鑰匙', '🔑'], ['breakfast', '早餐', '🥐'], ['elevator', '電梯', '🛗'], ['check out', '退房', '🚪']],
    lines: [['A', 'Hi. I want to check in.', '你好。我要辦理入住。'], ['B', 'Do you have a reservation?', '你有預約嗎？'], ['A', 'Yes, under the name Lin.', '有，名字是 Lin。'], ['B', 'Your room is on the fifth floor.', '你的房間在五樓。'], ['B', 'Here is your key.', '這是你的鑰匙。'], ['A', 'What time is breakfast?', '早餐是幾點？'], ['B', 'From seven. The elevator is over there.', '七點開始。電梯在那邊。'], ['A', 'What time is check out?', '退房是幾點？'], ['B', 'At eleven.', '十一點。']] },

  { id: 19, topic: 'travel', title: '飯店服務', en: 'Hotel Requests', scene: '🛎️', place: '打電話到櫃檯', npc: { name: '櫃檯人員', face: '🧑‍💼' },
    words: [['air conditioner', '冷氣', '❄️'], ['broken', '壞掉的', '🔧'], ['towels', '毛巾', '🧻'], ['toothbrush', '牙刷', '🪥'], ['Wi-Fi', '無線網路', '📶'], ['password', '密碼', '🔐'], ['clean', '打掃', '🧹'], ['later', '晚一點', '⏳']],
    lines: [['A', 'Hello, is this the front desk?', '你好，請問是櫃檯嗎？'], ['B', 'Yes. How can I help you?', '是的。有什麼需要幫忙的嗎？'], ['A', 'The air conditioner is broken.', '冷氣壞掉了。'], ['B', 'Sorry. We will fix it now.', '抱歉。我們馬上修。'], ['A', 'Can I have more towels?', '可以多給我一些毛巾嗎？'], ['A', 'And a toothbrush, please.', '還有一支牙刷，麻煩你。'], ['A', 'What is the Wi-Fi password?', '無線網路密碼是什麼？'], ['B', 'It is on your key card.', '在你的房卡上。'], ['A', 'Please clean my room later.', '請晚一點打掃我的房間。']] },

  { id: 20, topic: 'daily', title: '工作與學校', en: 'Work & School', scene: '💼', place: '午休聊天', npc: { name: '朋友 Ben', face: '👨‍💼' },
    words: [['teacher', '老師', '👩‍🏫'], ['work', '上班；工作', '🖥️'], ['office', '辦公室', '🏢'], ['job', '工作', '💼'], ['busy', '忙碌的', '😵‍💫'], ['meeting', '會議', '👥'], ['boss', '老闆', '🧑‍💼'], ['class', '課', '📖']],
    lines: [['B', 'What do you do?', '你是做什麼工作的？'], ['A', 'I am a teacher. What about you?', '我是老師。你呢？'], ['B', 'I work in an office.', '我在辦公室上班。'], ['A', 'Do you like your job?', '你喜歡你的工作嗎？'], ['B', 'Yes, but I am very busy.', '喜歡，但是我很忙。'], ['B', 'I have a meeting with my boss.', '我要跟老闆開會。'], ['A', 'I have a class at two.', '我兩點有一堂課。']] },

  { id: 21, topic: 'travel', title: '在餐廳點餐', en: 'At a Restaurant', scene: '🍝', place: '餐廳', npc: { name: '服務生', face: '🤵' },
    words: [['table', '桌子；位子', '🪑'], ['order', '點餐', '📝'], ['recommend', '推薦', '👍'], ['soup', '湯', '🍲'], ['vegetarian', '吃素的', '🥗'], ['curry', '咖哩', '🍛'], ['spicy', '辣的', '🌶️'], ['dessert', '甜點', '🍰']],
    lines: [['A', 'A table for two, please.', '請給我兩個人的位子。'], ['B', 'This way. Are you ready to order?', '這邊請。準備好點餐了嗎？'], ['A', 'What do you recommend?', '你推薦什麼？'], ['B', 'The beef soup is very good.', '牛肉湯很好喝。'], ['A', 'Sorry, I am vegetarian.', '抱歉，我吃素。'], ['B', 'Try our vegetable curry. It is not spicy.', '試試我們的蔬菜咖哩，不會辣。'], ['A', 'Great! And dessert later, please.', '太好了！甜點晚點再上，麻煩你。']] },

  { id: 22, topic: 'travel', title: '買單', en: 'Paying the Bill', scene: '🧾', place: '餐廳結帳', npc: { name: '服務生', face: '🤵' },
    words: [['bill', '帳單', '🧾'], ['together', '一起', '🤝'], ['separately', '分開地', '✂️'], ['pay', '付錢', '💰'], ['tip', '小費', '🪙'], ['included', '包含的', '✅'], ['receipt', '收據', '📃'], ['delicious', '好吃的', '😋']],
    lines: [['A', 'Excuse me, can I have the bill?', '不好意思，可以給我帳單嗎？'], ['B', 'Sure. Together or separately?', '好的。一起付還是分開付？'], ['A', 'We will pay separately.', '我們分開付。'], ['A', 'Is the tip included?', '有包含小費嗎？'], ['B', 'Yes, it is.', '有的。'], ['A', 'Can I get a receipt?', '可以給我收據嗎？'], ['A', 'It was delicious, thank you!', '很好吃，謝謝你！']] },

  { id: 23, topic: 'daily', title: '感覺與身體', en: 'Feelings & Health', scene: '🤒', place: '關心朋友', npc: { name: '朋友 Amy', face: '👩' },
    words: [['tired', '累的', '😴'], ['sick', '不舒服的；生病的', '🤒'], ['headache', '頭痛', '🤕'], ['fever', '發燒', '🌡️'], ['sad', '難過的', '😢'], ['rest', '休息', '🛌'], ['better', '好一點的', '🙂'], ['happy', '開心的', '😄']],
    lines: [['A', 'You look tired. Are you OK?', '你看起來很累。你還好嗎？'], ['B', 'I feel sick. I have a headache.', '我不舒服。我頭痛。'], ['A', 'Oh no! Do you have a fever?', '喔不！你有發燒嗎？'], ['B', 'No. And I am a little sad today.', '沒有。而且我今天有點難過。'], ['A', 'Get some rest.', '好好休息。'], ['A', 'I hope you feel better.', '希望你好一點。'], ['B', 'Thank you. I am happy you are here.', '謝謝你。有你在我很開心。']] },

  { id: 24, topic: 'travel', title: '參觀博物館', en: 'Sightseeing', scene: '🏛️', place: '博物館售票口', npc: { name: '售票員', face: '👩‍💼' },
    words: [['museum', '博物館', '🏛️'], ['open', '開門', '🔓'], ['close', '關門', '🔒'], ['tickets', '票', '🎟️'], ['free', '免費的', '🆓'], ['tour', '導覽', '🎧'], ['entrance', '入口', '🚪'], ['photos', '照片', '📸']],
    lines: [['A', 'What time does the museum open?', '博物館幾點開門？'], ['B', 'At nine. It will close at five.', '九點。五點關門。'], ['A', 'Two tickets, please.', '請給我兩張票。'], ['B', 'Children are free.', '兒童免費。'], ['A', 'Is there a guided tour?', '有導覽行程嗎？'], ['B', 'Yes, at ten. Meet at the entrance.', '有，十點。在入口集合。'], ['A', 'Can I take photos?', '我可以拍照嗎？'], ['B', 'Yes, but no flash.', '可以，但不能用閃光燈。']] },

  { id: 25, topic: 'travel', title: '請人幫忙', en: 'Asking for Help', scene: '🙋', place: '觀光景點', npc: { name: '路人', face: '🧑' },
    words: [['help', '幫忙', '🆘'], ['sure', '當然', '👌'], ['photo', '照片', '📷'], ['English', '英文', '🔤'], ['speak', '說', '🗣️'], ['slowly', '慢慢地', '🐢'], ['understand', '懂；理解', '💡'], ['again', '再一次', '🔁']],
    lines: [['A', 'Excuse me. Could you help me?', '不好意思。你可以幫我嗎？'], ['B', 'Sure! What is it?', '當然！什麼事？'], ['A', 'Could you take a photo of us?', '你可以幫我們拍張照嗎？'], ['B', 'No problem. Do you want the tower in the photo?', '沒問題。要把塔也拍進照片裡嗎？'], ['A', 'Sorry, my English is not good.', '抱歉，我的英文不太好。'], ['A', 'Could you speak slowly?', '你可以說慢一點嗎？'], ['B', 'Sure. Do you want the tower too?', '當然。塔也要拍進去嗎？'], ['A', 'Yes! I understand now. Thank you.', '要！我懂了。謝謝你。'], ['A', 'Could you take one again?', '你可以再拍一張嗎？']] },

  { id: 26, topic: 'daily', title: '約時間', en: 'Making Plans', scene: '📱', place: '講電話', npc: { name: '朋友 Tom', face: '🧑' },
    words: [['free', '有空的', '🙆'], ['Saturday', '星期六', '🗓️'], ['maybe', '也許', '🤔'], ['plan', '計畫', '🗒️'], ['dinner', '晚餐', '🍽️'], ['together', '一起', '🤝'], ['sounds good', '聽起來不錯', '👍'], ['call', '打電話', '📞']],
    lines: [['B', 'Hi! Are you free on Saturday?', '嗨！你星期六有空嗎？'], ['A', 'Maybe. What is your plan?', '也許。你有什麼計畫？'], ['B', 'Let\'s have dinner together.', '我們一起吃晚餐吧。'], ['A', 'Sounds good! What time?', '聽起來不錯！幾點？'], ['B', 'Six o\'clock?', '六點好嗎？'], ['A', 'OK. I will call you on Saturday.', '好。我星期六打給你。']] },

  { id: 27, topic: 'travel', title: '買紀念品', en: 'Buying Souvenirs', scene: '🎁', place: '紀念品店', npc: { name: '老闆', face: '👨‍💼' },
    words: [['gift', '禮物', '🎁'], ['popular', '受歡迎的', '⭐'], ['local', '當地的', '📍'], ['souvenir', '紀念品', '🗿'], ['each', '每一個', '☝️'], ['discount', '折扣', '🏷️'], ['wrap', '包裝', '🎀'], ['bag', '袋子', '🛍️']],
    lines: [['A', 'I am looking for a gift.', '我在找一份禮物。'], ['B', 'This tea is very popular.', '這款茶很受歡迎。'], ['A', 'Is it a local souvenir?', '這是當地的紀念品嗎？'], ['B', 'Yes. It is ten dollars each.', '是的。每個十元。'], ['A', 'Is there a discount for three?', '買三個有折扣嗎？'], ['B', 'OK, twenty-five dollars for three.', '好，三個二十五元。'], ['A', 'Great! Can you wrap them, please?', '太好了！可以幫我包裝嗎？'], ['B', 'Sure. Do you need a bag?', '當然。你需要袋子嗎？']] },

  { id: 28, topic: 'daily', title: '日常作息', en: 'Daily Routine', scene: '⏰', place: '聊生活', npc: { name: '朋友 Amy', face: '👩' },
    words: [['wake up', '起床', '⏰'], ['usually', '通常', '🔄'], ['shower', '洗澡', '🚿'], ['breakfast', '早餐', '🍳'], ['go to work', '去上班', '🚶'], ['lunch', '午餐', '🥪'], ['go home', '回家', '🏠'], ['sleep', '睡覺', '😴']],
    lines: [['B', 'What time do you wake up?', '你幾點起床？'], ['A', 'I usually wake up at six.', '我通常六點起床。'], ['A', 'I take a shower and eat breakfast.', '我洗澡然後吃早餐。'], ['B', 'When do you go to work?', '你什麼時候去上班？'], ['A', 'At eight. I eat lunch at noon.', '八點。我中午吃午餐。'], ['B', 'When do you go home?', '你什麼時候回家？'], ['A', 'At six. I go to sleep at ten.', '六點。我十點睡覺。']] },

  { id: 29, topic: 'travel', title: '藥局與看病', en: 'At the Pharmacy', scene: '💊', place: '藥局', npc: { name: '藥師', face: '🧑‍⚕️' },
    words: [['medicine', '藥', '💊'], ['pharmacy', '藥局', '🏪'], ['cold', '感冒', '🤧'], ['cough', '咳嗽', '😷'], ['fever', '發燒', '🌡️'], ['allergic', '過敏的', '🥜'], ['doctor', '醫生', '👨‍⚕️'], ['hospital', '醫院', '🏥']],
    lines: [['A', 'Hello. I need some medicine.', '你好。我需要一些藥。'], ['B', 'Welcome to the pharmacy. What is wrong?', '歡迎光臨藥局。哪裡不舒服？'], ['A', 'I think I have a cold.', '我想我感冒了。'], ['A', 'I have a cough and a fever.', '我咳嗽又發燒。'], ['B', 'Are you allergic to anything?', '你對什麼東西過敏嗎？'], ['A', 'No, I am not.', '沒有。'], ['B', 'Take this. If you feel worse, see a doctor.', '吃這個。如果更不舒服，就去看醫生。'], ['A', 'Is there a hospital near here?', '附近有醫院嗎？']] },

  { id: 30, topic: 'travel', title: '緊急狀況', en: 'Emergencies', scene: '🚨', place: '街上遇到警察', npc: { name: '警察', face: '👮' },
    words: [['police', '警察', '👮'], ['stolen', '被偷的', '🦹'], ['phone', '手機', '📱'], ['lost', '弄丟了', '❓'], ['wallet', '錢包', '👛'], ['ambulance', '救護車', '🚑'], ['emergency', '緊急情況', '🚨'], ['passport', '護照', '🛂']],
    lines: [['A', 'Help! Please call the police!', '救命！請打電話叫警察！'], ['B', 'I am a police officer. What happened?', '我是警察。發生什麼事？'], ['A', 'My phone was stolen!', '我的手機被偷了！'], ['A', 'I lost my wallet too.', '我的錢包也弄丟了。'], ['B', 'Are you hurt? Do you need an ambulance?', '你受傷了嗎？需要救護車嗎？'], ['A', 'No. But this is an emergency!', '沒有。但這是緊急情況！'], ['B', 'Do you have your passport?', '你的護照在身上嗎？'], ['A', 'Yes, it is in my bag.', '在，在我的包包裡。']] }
];
