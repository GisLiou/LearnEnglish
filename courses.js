/* 浣浣學英文 · 60 單元課程內容（1–30 基礎、31–60 進階）
   每單元：一段情境對話（A = 浣浣，B = 情境角色），8 個重點單字都會出現在對話裡。
   words: [英文, 中文, 圖示]；lines: [說話者, 英文, 中文] */
window.COURSE = [
  { id: 1, topic: 'daily', title: '打招呼', en: 'Greetings', scene: '🏡', place: '早上在家門口', npc: { name: '鄰居 Amy', face: '👩', g: 'f' },
    words: [['hello', '哈囉', '🙋'], ['good morning', '早安', '🌅'], ['how are you', '你好嗎', '😊'], ['fine', '很好的', '👌'], ['thank you', '謝謝你', '🙏'], ['please', '請；麻煩你', '🤲'], ['yes', '是的；好', '✅'], ['goodbye', '再見', '👋']],
    lines: [['B', 'Hello! Good morning!', '哈囉！早安！'], ['A', 'Good morning, Amy! How are you?', '早安，Amy！你好嗎？'], ['B', 'I am fine, thank you.', '我很好，謝謝你。'], ['A', 'Do you want some coffee?', '你想喝點咖啡嗎？'], ['B', 'Yes, please!', '好，麻煩你！'], ['A', 'Here you are.', '給你。'], ['B', 'Thank you! Goodbye!', '謝謝你！再見！']] },

  { id: 2, topic: 'daily', title: '自我介紹', en: 'Introductions', scene: '🎉', place: '朋友的聚會', npc: { name: '新朋友 Tom', face: '👨', g: 'm' },
    words: [['name', '名字', '📛'], ['nice', '很好的；高興的', '👍'], ['meet', '認識；見面', '🤝'], ['friend', '朋友', '👫'], ['from', '來自', '📍'], ['Taiwan', '台灣', '🏝️'], ['live', '住', '🏠'], ['student', '學生', '🎒']],
    lines: [['B', 'Hi! My name is Tom.', '嗨！我的名字是 Tom。'], ['A', 'Nice to meet you, Tom.', '很高興認識你，Tom。'], ['B', 'This is my friend, Amy.', '這是我的朋友 Amy。'], ['A', 'Hello, Amy!', '哈囉，Amy！'], ['B', 'Where are you from?', '你來自哪裡？'], ['A', 'I am from Taiwan.', '我來自台灣。'], ['B', 'Do you live in Taipei?', '你住在台北嗎？'], ['A', 'Yes. I am a student.', '是的。我是學生。']] },

  { id: 3, topic: 'daily', title: '數字', en: 'Numbers', scene: '🍎', place: '水果攤', npc: { name: '水果攤老闆', face: '👨‍🌾', g: 'm' },
    words: [['one', '一', '1️⃣'], ['two', '二', '2️⃣'], ['three', '三', '3️⃣'], ['four', '四', '4️⃣'], ['five', '五', '5️⃣'], ['six', '六', '6️⃣'], ['ten', '十', '🔟'], ['how many', '多少個', '🔢']],
    lines: [['B', 'Hello! How many apples?', '哈囉！要幾顆蘋果？'], ['A', 'Three apples, please.', '三顆蘋果，麻煩你。'], ['B', 'OK. One, two, three.', '好的。一、二、三。'], ['A', 'And four bananas.', '還有四根香蕉。'], ['B', 'Anything else?', '還要別的嗎？'], ['A', 'Five eggs and six lemons.', '五顆蛋和六顆檸檬。'], ['B', 'That is ten dollars.', '這樣是十元。']] },

  { id: 4, topic: 'daily', title: '家人', en: 'Family', scene: '📷', place: '一起看相簿', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['photo', '照片', '📷'], ['family', '家人', '👨‍👩‍👧'], ['mother', '媽媽', '👩'], ['father', '爸爸', '👨'], ['sister', '姊妹；姊姊或妹妹', '👧'], ['brother', '兄弟；哥哥或弟弟', '👦'], ['baby', '寶寶', '👶'], ['cute', '可愛的', '🥰']],
    lines: [['A', 'Look at this photo. This is my family.', '你看這張照片。這是我的家人。'], ['B', 'Is this your mother?', '這是你的媽媽嗎？'], ['A', 'Yes, and this is my father.', '對，這是我的爸爸。'], ['B', 'Who is this girl?', '這個女孩是誰？'], ['A', 'She is my sister.', '她是我的姊妹。'], ['B', 'Do you have a brother?', '你有兄弟嗎？'], ['A', 'Yes. He has a baby.', '有。他有一個寶寶。'], ['B', 'The baby is so cute!', '寶寶好可愛！']] },

  { id: 5, topic: 'daily', title: '顏色與衣服', en: 'Colors & Clothes', scene: '🛍️', place: '服飾店', npc: { name: '店員', face: '👩‍💼', g: 'f' },
    words: [['blue', '藍色', '🔵'], ['shirt', '襯衫', '👕'], ['red', '紅色', '🔴'], ['white', '白色', '⚪'], ['black', '黑色', '⚫'], ['shoes', '鞋子', '👟'], ['hat', '帽子', '👒'], ['jacket', '外套', '🧥']],
    lines: [['B', 'Hello! Can I help you?', '哈囉！需要幫忙嗎？'], ['A', 'I like this blue shirt.', '我喜歡這件藍色襯衫。'], ['B', 'We also have red and white.', '我們也有紅色和白色。'], ['A', 'Do you have black shoes?', '你們有黑色的鞋子嗎？'], ['B', 'Yes. How about this hat?', '有的。這頂帽子怎麼樣？'], ['A', 'It is nice. And this jacket?', '很好看。那這件外套呢？'], ['B', 'The jacket is on sale today.', '這件外套今天特價。']] },

  { id: 6, topic: 'daily', title: '時間與星期', en: 'Time & Days', scene: '📅', place: '辦公室', npc: { name: '同事 Ben', face: '👨‍💼', g: 'm' },
    words: [['what time', '幾點', '⏰'], ['morning', '早上', '🌄'], ['today', '今天', '📅'], ['Monday', '星期一', '🗓️'], ['Friday', '星期五', '🎉'], ['weekend', '週末', '🏖️'], ['tomorrow', '明天', '➡️'], ['night', '晚上', '🌙']],
    lines: [['A', 'What time is it?', '現在幾點？'], ['B', 'It is nine in the morning.', '現在是早上九點。'], ['A', 'Is today Monday?', '今天是星期一嗎？'], ['B', 'No, today is Friday!', '不是，今天是星期五！'], ['A', 'Great! The weekend is tomorrow.', '太好了！明天就是週末。'], ['B', 'Let\'s see a movie on Saturday night.', '我們星期六晚上去看電影吧。']] },

  { id: 7, topic: 'daily', title: '食物與飲料', en: 'Food & Drinks', scene: '🍽️', place: '中午吃飯', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['hungry', '餓的', '😋'], ['rice', '飯', '🍚'], ['noodles', '麵', '🍜'], ['chicken', '雞肉', '🍗'], ['tea', '茶', '🍵'], ['water', '水', '💧'], ['bread', '麵包', '🍞'], ['apple', '蘋果', '🍎']],
    lines: [['A', 'I am hungry.', '我肚子餓了。'], ['B', 'Do you want rice or noodles?', '你想吃飯還是麵？'], ['A', 'Noodles with chicken, please.', '請給我雞肉麵。'], ['B', 'Do you want some tea?', '你要喝點茶嗎？'], ['A', 'Just water, thank you.', '開水就好，謝謝。'], ['B', 'Have some bread and an apple.', '吃點麵包和一顆蘋果吧。']] },

  { id: 8, topic: 'daily', title: '在咖啡店', en: 'At the Café', scene: '☕', place: '咖啡店', npc: { name: '店員', face: '👩‍🍳', g: 'f' },
    words: [['menu', '菜單', '📋'], ['coffee', '咖啡', '☕'], ['hot', '熱的', '🔥'], ['iced', '冰的', '🧊'], ['milk', '牛奶', '🥛'], ['sugar', '糖', '🍬'], ['large', '大的', '🥤'], ['to go', '外帶', '🛍️']],
    lines: [['A', 'Can I see the menu?', '我可以看一下菜單嗎？'], ['B', 'Sure. What would you like?', '當然。你想要什麼？'], ['A', 'One coffee, please.', '請給我一杯咖啡。'], ['B', 'Hot or iced?', '熱的還是冰的？'], ['A', 'Iced, with milk. No sugar.', '冰的，加牛奶。不要糖。'], ['B', 'Small or large?', '小杯還是大杯？'], ['A', 'Large, please.', '大杯，麻煩你。'], ['B', 'For here or to go?', '內用還是外帶？'], ['A', 'To go, please.', '外帶，麻煩你。']] },

  { id: 9, topic: 'travel', title: '機場報到', en: 'Airport Check-in', scene: '🛫', place: '機場報到櫃檯', npc: { name: '地勤人員', face: '👩‍✈️', g: 'f' },
    words: [['passport', '護照', '🛂'], ['ticket', '票；機票', '🎫'], ['flight', '班機', '✈️'], ['luggage', '行李', '🧳'], ['bag', '袋子；一件行李', '👜'], ['window seat', '靠窗座位', '🪟'], ['boarding pass', '登機證', '🎟️'], ['gate', '登機門', '🚪']],
    lines: [['B', 'Good morning. Passport and ticket, please.', '早安。請給我護照和機票。'], ['A', 'Here you are.', '給你。'], ['B', 'Your flight is to Tokyo.', '你的班機是飛往東京。'], ['B', 'Do you have any luggage?', '你有行李嗎？'], ['A', 'Yes, one bag.', '有，一件。'], ['A', 'Can I have a window seat?', '我可以坐靠窗的位子嗎？'], ['B', 'Sure. Here is your boarding pass.', '沒問題。這是你的登機證。'], ['B', 'Please go to gate twelve.', '請到十二號登機門。']] },

  { id: 10, topic: 'travel', title: '在飛機上', en: 'On the Plane', scene: '✈️', place: '飛機上', npc: { name: '空服員', face: '👩‍✈️', g: 'f' },
    words: [['seat', '座位', '💺'], ['blanket', '毯子', '🛌'], ['pillow', '枕頭', '🛏️'], ['meal', '餐點', '🍱'], ['beef', '牛肉', '🥩'], ['fish', '魚', '🐟'], ['juice', '果汁', '🧃'], ['bathroom', '洗手間', '🚻']],
    lines: [['B', 'Welcome. Here is your seat.', '歡迎。這是您的座位。'], ['A', 'Thank you. Can I have a blanket?', '謝謝。可以給我一條毯子嗎？'], ['B', 'Sure. Here is a pillow too.', '當然。也給您一個枕頭。'], ['B', 'It is meal time. Beef or fish?', '用餐時間到了。牛肉還是魚？'], ['A', 'Fish, please. And some juice.', '魚，麻煩你。還有一些果汁。'], ['A', 'Where is the bathroom?', '洗手間在哪裡？'], ['B', 'It is at the back.', '在後面。']] },

  { id: 11, topic: 'daily', title: '購物', en: 'Shopping', scene: '🏬', place: '百貨公司', npc: { name: '店員', face: '👩‍💼', g: 'f' },
    words: [['how much', '多少錢', '💰'], ['price', '價格', '🏷️'], ['expensive', '貴的', '💸'], ['cheap', '便宜的', '🪙'], ['try', '試；試穿', '👗'], ['size', '尺寸', '📏'], ['card', '卡；信用卡', '💳'], ['cash', '現金', '💵']],
    lines: [['A', 'How much is this dress?', '這件洋裝多少錢？'], ['B', 'The price is ninety dollars.', '價格是九十元。'], ['A', 'That is expensive.', '那很貴。'], ['B', 'This one is cheap. Only thirty.', '這件很便宜。只要三十。'], ['A', 'Can I try it on?', '我可以試穿嗎？'], ['B', 'Sure. What size do you need?', '當然。你需要什麼尺寸？'], ['A', 'Medium. Can I pay by card?', '中號。我可以刷卡嗎？'], ['B', 'Sorry, cash only.', '抱歉，只收現金。']] },

  { id: 12, topic: 'travel', title: '入境與海關', en: 'Immigration', scene: '🛂', place: '入境櫃檯', npc: { name: '海關人員', face: '👮‍♂️', g: 'm' },
    words: [['visit', '來訪；拜訪', '🗺️'], ['holiday', '假期', '🏖️'], ['business', '商務', '💼'], ['first time', '第一次', '🥇'], ['stay', '停留', '🛎️'], ['days', '天', '📆'], ['hotel', '飯店', '🏨'], ['declare', '申報', '📝']],
    lines: [['B', 'What is the purpose of your visit?', '你來訪的目的是什麼？'], ['A', 'I am here on holiday.', '我來這裡度假。'], ['B', 'Not business?', '不是商務？'], ['A', 'No. It is my first time here.', '不是。這是我第一次來這裡。'], ['B', 'How long will you stay?', '你會停留多久？'], ['A', 'Five days, at a hotel.', '五天，住在飯店。'], ['B', 'Anything to declare?', '有東西要申報嗎？'], ['A', 'No, nothing.', '沒有，什麼都沒有。']] },

  { id: 13, topic: 'daily', title: '天氣', en: 'Weather', scene: '⛅', place: '出門前', npc: { name: '室友 Amy', face: '👩', g: 'f' },
    words: [['weather', '天氣', '🌤️'], ['cloudy', '多雲的', '☁️'], ['windy', '颳風的', '💨'], ['cold', '冷的', '🥶'], ['warm', '溫暖的；保暖的', '🧣'], ['rainy', '下雨的', '🌧️'], ['umbrella', '雨傘', '☂️'], ['sunny', '晴朗的', '☀️']],
    lines: [['A', 'How is the weather today?', '今天天氣如何？'], ['B', 'It is cloudy and windy.', '多雲而且颳風。'], ['A', 'Is it cold outside?', '外面冷嗎？'], ['B', 'A little. Take a warm jacket.', '有一點。帶件保暖的外套。'], ['B', 'It may be rainy later. Take your umbrella.', '晚點可能會下雨。帶上你的雨傘。'], ['A', 'OK. I hope tomorrow is sunny!', '好。希望明天是晴天！']] },

  { id: 14, topic: 'travel', title: '搭計程車', en: 'Taking a Taxi', scene: '🚕', place: '計程車上', npc: { name: '司機', face: '🧔', g: 'm' },
    words: [['taxi', '計程車', '🚕'], ['airport', '機場', '🛫'], ['address', '地址', '📮'], ['how long', '多久', '⏱️'], ['stop', '停下', '🛑'], ['station', '車站', '🚉'], ['left', '左邊', '⬅️'], ['right', '右邊', '➡️']],
    lines: [['A', 'Taxi!', '計程車！'], ['B', 'Hello. Where to?', '你好。要去哪裡？'], ['A', 'Please take me to this address.', '請載我到這個地址。'], ['B', 'OK. It is near the airport.', '好的。這在機場附近。'], ['A', 'How long will it take?', '要多久時間？'], ['B', 'About thirty minutes.', '大約三十分鐘。'], ['A', 'Please stop at the station first.', '請先在車站停一下。'], ['B', 'Sure. Is it on the left or right?', '好的。在左邊還是右邊？'], ['A', 'It is on the right.', '在右邊。']] },

  { id: 15, topic: 'travel', title: '搭大眾運輸', en: 'Public Transport', scene: '🚆', place: '火車站售票口', npc: { name: '站務員', face: '👷‍♂️', g: 'm' },
    words: [['ticket', '票；車票', '🎫'], ['one-way', '單程的', '➡️'], ['round trip', '來回', '🔁'], ['next', '下一個', '⏭️'], ['train', '火車', '🚆'], ['platform', '月台', '🛤️'], ['bus', '公車', '🚌'], ['subway', '地鐵', '🚇']],
    lines: [['A', 'One ticket to Taipei, please.', '請給我一張到台北的票。'], ['B', 'One-way or round trip?', '單程還是來回？'], ['A', 'Round trip, please.', '來回，麻煩你。'], ['A', 'When is the next train?', '下一班火車是什麼時候？'], ['B', 'At ten. Go to platform three.', '十點。請到第三月台。'], ['A', 'Is there a bus or subway to the hotel?', '有公車或地鐵到飯店嗎？'], ['B', 'Yes, take the subway.', '有，搭地鐵。']] },

  { id: 16, topic: 'travel', title: '問路', en: 'Asking for Directions', scene: '🗺️', place: '街上', npc: { name: '路人', face: '👵', g: 'f' },
    words: [['excuse me', '不好意思', '🙋'], ['lost', '迷路的', '😵'], ['how do I get to', '怎麼去', '🧭'], ['go straight', '直走', '⬆️'], ['turn left', '左轉', '↩️'], ['corner', '轉角', '📐'], ['far', '遠的', '🚶'], ['map', '地圖', '🗺️']],
    lines: [['A', 'Excuse me. I am lost.', '不好意思。我迷路了。'], ['B', 'Can I help you?', '需要幫忙嗎？'], ['A', 'How do I get to the museum?', '請問博物館怎麼去？'], ['B', 'Go straight and turn left.', '直走然後左轉。'], ['B', 'It is on the corner.', '它在轉角。'], ['A', 'Is it far?', '很遠嗎？'], ['B', 'No, it is not far. Look at this map.', '不遠。你看這張地圖。']] },

  { id: 17, topic: 'daily', title: '興趣', en: 'Hobbies', scene: '🎨', place: '喝茶聊天', npc: { name: '朋友 Tom', face: '👨', g: 'm' },
    words: [['hobby', '興趣', '🎯'], ['music', '音樂', '🎵'], ['movies', '電影', '🎬'], ['books', '書', '📚'], ['sports', '運動', '⚽'], ['swim', '游泳', '🏊'], ['cook', '做菜', '🍳'], ['travel', '旅行', '🌏']],
    lines: [['B', 'What is your hobby?', '你的興趣是什麼？'], ['A', 'I like music and movies.', '我喜歡音樂和電影。'], ['B', 'Do you read books?', '你會看書嗎？'], ['A', 'Yes. Do you like sports?', '會啊。你喜歡運動嗎？'], ['B', 'I swim every morning.', '我每天早上游泳。'], ['A', 'I like to cook and travel.', '我喜歡做菜和旅行。']] },

  { id: 18, topic: 'travel', title: '飯店入住', en: 'Hotel Check-in', scene: '🏨', place: '飯店櫃檯', npc: { name: '櫃檯人員', face: '👩‍💼', g: 'f' },
    words: [['check in', '入住', '🛎️'], ['reservation', '預約', '📋'], ['room', '房間', '🛏️'], ['floor', '樓層', '🏢'], ['key', '鑰匙', '🔑'], ['breakfast', '早餐', '🥐'], ['elevator', '電梯', '🛗'], ['check out', '退房', '🚪']],
    lines: [['A', 'Hi. I want to check in.', '你好。我要辦理入住。'], ['B', 'Do you have a reservation?', '你有預約嗎？'], ['A', 'Yes, under the name Lin.', '有，名字是 Lin。'], ['B', 'Your room is on the fifth floor.', '你的房間在五樓。'], ['B', 'Here is your key.', '這是你的鑰匙。'], ['A', 'What time is breakfast?', '早餐是幾點？'], ['B', 'From seven. The elevator is over there.', '七點開始。電梯在那邊。'], ['A', 'What time is check out?', '退房是幾點？'], ['B', 'At eleven.', '十一點。']] },

  { id: 19, topic: 'travel', title: '飯店服務', en: 'Hotel Requests', scene: '🛎️', place: '打電話到櫃檯', npc: { name: '櫃檯人員', face: '👩‍💼', g: 'f' },
    words: [['air conditioner', '冷氣', '❄️'], ['broken', '壞掉的', '🔧'], ['towels', '毛巾', '🧻'], ['toothbrush', '牙刷', '🪥'], ['Wi-Fi', '無線網路', '📶'], ['password', '密碼', '🔐'], ['clean', '打掃', '🧹'], ['later', '晚一點', '⏳']],
    lines: [['A', 'Hello, is this the front desk?', '你好，請問是櫃檯嗎？'], ['B', 'Yes. How can I help you?', '是的。有什麼需要幫忙的嗎？'], ['A', 'The air conditioner is broken.', '冷氣壞掉了。'], ['B', 'Sorry. We will fix it now.', '抱歉。我們馬上修。'], ['A', 'Can I have more towels?', '可以多給我一些毛巾嗎？'], ['A', 'And a toothbrush, please.', '還有一支牙刷，麻煩你。'], ['A', 'What is the Wi-Fi password?', '無線網路密碼是什麼？'], ['B', 'It is on your key card.', '在你的房卡上。'], ['A', 'Please clean my room later.', '請晚一點打掃我的房間。']] },

  { id: 20, topic: 'daily', title: '工作與學校', en: 'Work & School', scene: '💼', place: '午休聊天', npc: { name: '朋友 Ben', face: '👨‍💼', g: 'm' },
    words: [['teacher', '老師', '👩‍🏫'], ['work', '上班；工作', '🖥️'], ['office', '辦公室', '🏢'], ['job', '工作', '💼'], ['busy', '忙碌的', '😵‍💫'], ['meeting', '會議', '👥'], ['boss', '老闆', '🧑‍💼'], ['class', '課', '📖']],
    lines: [['B', 'What do you do?', '你是做什麼工作的？'], ['A', 'I am a teacher. What about you?', '我是老師。你呢？'], ['B', 'I work in an office.', '我在辦公室上班。'], ['A', 'Do you like your job?', '你喜歡你的工作嗎？'], ['B', 'Yes, but I am very busy.', '喜歡，但是我很忙。'], ['B', 'I have a meeting with my boss.', '我要跟老闆開會。'], ['A', 'I have a class at two.', '我兩點有一堂課。']] },

  { id: 21, topic: 'travel', title: '在餐廳點餐', en: 'At a Restaurant', scene: '🍝', place: '餐廳', npc: { name: '服務生', face: '🤵', g: 'm' },
    words: [['table', '桌子；位子', '🪑'], ['order', '點餐', '📝'], ['recommend', '推薦', '👍'], ['soup', '湯', '🍲'], ['vegetarian', '吃素的', '🥗'], ['curry', '咖哩', '🍛'], ['spicy', '辣的', '🌶️'], ['dessert', '甜點', '🍰']],
    lines: [['A', 'A table for two, please.', '請給我兩個人的位子。'], ['B', 'This way. Are you ready to order?', '這邊請。準備好點餐了嗎？'], ['A', 'What do you recommend?', '你推薦什麼？'], ['B', 'The beef soup is very good.', '牛肉湯很好喝。'], ['A', 'Sorry, I am vegetarian.', '抱歉，我吃素。'], ['B', 'Try our vegetable curry. It is not spicy.', '試試我們的蔬菜咖哩，不會辣。'], ['A', 'Great! And dessert later, please.', '太好了！甜點晚點再上，麻煩你。']] },

  { id: 22, topic: 'travel', title: '買單', en: 'Paying the Bill', scene: '🧾', place: '餐廳結帳', npc: { name: '服務生', face: '🤵', g: 'm' },
    words: [['bill', '帳單', '🧾'], ['together', '一起', '🤝'], ['separately', '分開地', '✂️'], ['pay', '付錢', '💰'], ['tip', '小費', '🪙'], ['included', '包含的', '✅'], ['receipt', '收據', '📃'], ['delicious', '好吃的', '😋']],
    lines: [['A', 'Excuse me, can I have the bill?', '不好意思，可以給我帳單嗎？'], ['B', 'Sure. Together or separately?', '好的。一起付還是分開付？'], ['A', 'We will pay separately.', '我們分開付。'], ['A', 'Is the tip included?', '有包含小費嗎？'], ['B', 'Yes, it is.', '有的。'], ['A', 'Can I get a receipt?', '可以給我收據嗎？'], ['A', 'It was delicious, thank you!', '很好吃，謝謝你！']] },

  { id: 23, topic: 'daily', title: '感覺與身體', en: 'Feelings & Health', scene: '🤒', place: '關心朋友', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['tired', '累的', '😴'], ['sick', '不舒服的；生病的', '🤒'], ['headache', '頭痛', '🤕'], ['fever', '發燒', '🌡️'], ['sad', '難過的', '😢'], ['rest', '休息', '🛌'], ['better', '好一點的', '🙂'], ['happy', '開心的', '😄']],
    lines: [['A', 'You look tired. Are you OK?', '你看起來很累。你還好嗎？'], ['B', 'I feel sick. I have a headache.', '我不舒服。我頭痛。'], ['A', 'Oh no! Do you have a fever?', '喔不！你有發燒嗎？'], ['B', 'No. And I am a little sad today.', '沒有。而且我今天有點難過。'], ['A', 'Get some rest.', '好好休息。'], ['A', 'I hope you feel better.', '希望你好一點。'], ['B', 'Thank you. I am happy you are here.', '謝謝你。有你在我很開心。']] },

  { id: 24, topic: 'travel', title: '參觀博物館', en: 'Sightseeing', scene: '🏛️', place: '博物館售票口', npc: { name: '售票員', face: '👩‍💼', g: 'f' },
    words: [['museum', '博物館', '🏛️'], ['open', '開門', '🔓'], ['close', '關門', '🔒'], ['tickets', '票', '🎟️'], ['free', '免費的', '🆓'], ['tour', '導覽', '🎧'], ['entrance', '入口', '🚪'], ['photos', '照片', '📸']],
    lines: [['A', 'What time does the museum open?', '博物館幾點開門？'], ['B', 'At nine. It will close at five.', '九點。五點關門。'], ['A', 'Two tickets, please.', '請給我兩張票。'], ['B', 'Children are free.', '兒童免費。'], ['A', 'Is there a guided tour?', '有導覽行程嗎？'], ['B', 'Yes, at ten. Meet at the entrance.', '有，十點。在入口集合。'], ['A', 'Can I take photos?', '我可以拍照嗎？'], ['B', 'Yes, but no flash.', '可以，但不能用閃光燈。']] },

  { id: 25, topic: 'travel', title: '請人幫忙', en: 'Asking for Help', scene: '🙋', place: '觀光景點', npc: { name: '路人', face: '👨', g: 'm' },
    words: [['help', '幫忙', '🆘'], ['sure', '當然', '👌'], ['photo', '照片', '📷'], ['English', '英文', '🔤'], ['speak', '說', '🗣️'], ['slowly', '慢慢地', '🐢'], ['understand', '懂；理解', '💡'], ['again', '再一次', '🔁']],
    lines: [['A', 'Excuse me. Could you help me?', '不好意思。你可以幫我嗎？'], ['B', 'Sure! What is it?', '當然！什麼事？'], ['A', 'Could you take a photo of us?', '你可以幫我們拍張照嗎？'], ['B', 'No problem. Do you want the tower in the photo?', '沒問題。要把塔也拍進照片裡嗎？'], ['A', 'Sorry, my English is not good.', '抱歉，我的英文不太好。'], ['A', 'Could you speak slowly?', '你可以說慢一點嗎？'], ['B', 'Sure. Do you want the tower too?', '當然。塔也要拍進去嗎？'], ['A', 'Yes! I understand now. Thank you.', '要！我懂了。謝謝你。'], ['A', 'Could you take one again?', '你可以再拍一張嗎？']] },

  { id: 26, topic: 'daily', title: '約時間', en: 'Making Plans', scene: '📱', place: '講電話', npc: { name: '朋友 Tom', face: '👨', g: 'm' },
    words: [['free', '有空的', '🙆'], ['Saturday', '星期六', '🗓️'], ['maybe', '也許', '🤔'], ['plan', '計畫', '🗒️'], ['dinner', '晚餐', '🍽️'], ['together', '一起', '🤝'], ['sounds good', '聽起來不錯', '👍'], ['call', '打電話', '📞']],
    lines: [['B', 'Hi! Are you free on Saturday?', '嗨！你星期六有空嗎？'], ['A', 'Maybe. What is your plan?', '也許。你有什麼計畫？'], ['B', 'Let\'s have dinner together.', '我們一起吃晚餐吧。'], ['A', 'Sounds good! What time?', '聽起來不錯！幾點？'], ['B', 'Six o\'clock?', '六點好嗎？'], ['A', 'OK. I will call you on Saturday.', '好。我星期六打給你。']] },

  { id: 27, topic: 'travel', title: '買紀念品', en: 'Buying Souvenirs', scene: '🎁', place: '紀念品店', npc: { name: '老闆', face: '👨‍💼', g: 'm' },
    words: [['gift', '禮物', '🎁'], ['popular', '受歡迎的', '⭐'], ['local', '當地的', '📍'], ['souvenir', '紀念品', '🗿'], ['each', '每一個', '☝️'], ['discount', '折扣', '🏷️'], ['wrap', '包裝', '🎀'], ['bag', '袋子', '🛍️']],
    lines: [['A', 'I am looking for a gift.', '我在找一份禮物。'], ['B', 'This tea is very popular.', '這款茶很受歡迎。'], ['A', 'Is it a local souvenir?', '這是當地的紀念品嗎？'], ['B', 'Yes. It is ten dollars each.', '是的。每個十元。'], ['A', 'Is there a discount for three?', '買三個有折扣嗎？'], ['B', 'OK, twenty-five dollars for three.', '好，三個二十五元。'], ['A', 'Great! Can you wrap them, please?', '太好了！可以幫我包裝嗎？'], ['B', 'Sure. Do you need a bag?', '當然。你需要袋子嗎？']] },

  { id: 28, topic: 'daily', title: '日常作息', en: 'Daily Routine', scene: '⏰', place: '聊生活', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['wake up', '起床', '⏰'], ['usually', '通常', '🔄'], ['shower', '洗澡', '🚿'], ['breakfast', '早餐', '🍳'], ['go to work', '去上班', '🚶'], ['lunch', '午餐', '🥪'], ['go home', '回家', '🏠'], ['sleep', '睡覺', '😴']],
    lines: [['B', 'What time do you wake up?', '你幾點起床？'], ['A', 'I usually wake up at six.', '我通常六點起床。'], ['A', 'I take a shower and eat breakfast.', '我洗澡然後吃早餐。'], ['B', 'When do you go to work?', '你什麼時候去上班？'], ['A', 'At eight. I eat lunch at noon.', '八點。我中午吃午餐。'], ['B', 'When do you go home?', '你什麼時候回家？'], ['A', 'At six. I go to sleep at ten.', '六點。我十點睡覺。']] },

  { id: 29, topic: 'travel', title: '藥局與看病', en: 'At the Pharmacy', scene: '💊', place: '藥局', npc: { name: '藥師', face: '👩‍⚕️', g: 'f' },
    words: [['medicine', '藥', '💊'], ['pharmacy', '藥局', '🏪'], ['cold', '感冒', '🤧'], ['cough', '咳嗽', '😷'], ['fever', '發燒', '🌡️'], ['allergic', '過敏的', '🥜'], ['doctor', '醫生', '👨‍⚕️'], ['hospital', '醫院', '🏥']],
    lines: [['A', 'Hello. I need some medicine.', '你好。我需要一些藥。'], ['B', 'Welcome to the pharmacy. What is wrong?', '歡迎光臨藥局。哪裡不舒服？'], ['A', 'I think I have a cold.', '我想我感冒了。'], ['A', 'I have a cough and a fever.', '我咳嗽又發燒。'], ['B', 'Are you allergic to anything?', '你對什麼東西過敏嗎？'], ['A', 'No, I am not.', '沒有。'], ['B', 'Take this. If you feel worse, see a doctor.', '吃這個。如果更不舒服，就去看醫生。'], ['A', 'Is there a hospital near here?', '附近有醫院嗎？']] },

  { id: 30, topic: 'travel', title: '緊急狀況', en: 'Emergencies', scene: '🚨', place: '街上遇到警察', npc: { name: '警察', face: '👮‍♂️', g: 'm' },
    words: [['police', '警察', '👮'], ['stolen', '被偷的', '🦹'], ['phone', '手機', '📱'], ['lost', '弄丟了', '❓'], ['wallet', '錢包', '👛'], ['ambulance', '救護車', '🚑'], ['emergency', '緊急情況', '🚨'], ['passport', '護照', '🛂']],
    lines: [['A', 'Help! Please call the police!', '救命！請打電話叫警察！'], ['B', 'I am a police officer. What happened?', '我是警察。發生什麼事？'], ['A', 'My phone was stolen!', '我的手機被偷了！'], ['A', 'I lost my wallet too.', '我的錢包也弄丟了。'], ['B', 'Are you hurt? Do you need an ambulance?', '你受傷了嗎？需要救護車嗎？'], ['A', 'No. But this is an emergency!', '沒有。但這是緊急情況！'], ['B', 'Do you have your passport?', '你的護照在身上嗎？'], ['A', 'Yes, it is in my bag.', '在，在我的包包裡。']] },

  /* ===== 第二個月：31–60 單元（句子稍長一點，更多生活與旅遊情境） ===== */
  { id: 31, topic: 'daily', title: '逛超市', en: 'At the Supermarket', scene: '🛒', place: '超市', npc: { name: '店員', face: '👨‍💼', g: 'm' },
    words: [['where is', '在哪裡', '❓'], ['fruit', '水果', '🍇'], ['vegetables', '蔬菜', '🥦'], ['fresh', '新鮮的', '🌿'], ['meat', '肉', '🥩'], ['eggs', '雞蛋', '🥚'], ['bottle', '瓶子；一瓶', '🍾'], ['cart', '推車', '🛒']],
    lines: [['A', 'Excuse me, where is the fruit?', '不好意思，水果在哪裡？'], ['B', 'The fruit is next to the vegetables.', '水果在蔬菜旁邊。'], ['A', 'Are these apples fresh?', '這些蘋果新鮮嗎？'], ['B', 'Yes, they came in this morning.', '新鮮，今天早上才進貨的。'], ['A', 'Where is the meat?', '肉在哪裡？'], ['B', 'It is at the back, near the eggs.', '在後面，雞蛋的旁邊。'], ['A', 'I need a bottle of milk too.', '我還需要一瓶牛奶。'], ['B', 'Here. Do you need a cart?', '在這裡。你需要推車嗎？'], ['A', 'Yes, please. Thank you!', '要，麻煩你。謝謝！']] },

  { id: 32, topic: 'daily', title: '在家做菜', en: 'Cooking at Home', scene: '🍳', place: '朋友家的廚房', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['kitchen', '廚房', '🍳'], ['cut', '切', '🔪'], ['onion', '洋蔥', '🧅'], ['pot', '鍋子', '🍲'], ['oil', '油', '🫒'], ['salt', '鹽', '🧂'], ['taste', '嚐；嚐味道', '👅'], ['ready', '準備好的', '✅']],
    lines: [['B', 'Welcome to my kitchen!', '歡迎來到我的廚房！'], ['A', 'What are we cooking today?', '我們今天要煮什麼？'], ['B', 'Tomato soup. Can you cut the onion?', '番茄湯。你可以切洋蔥嗎？'], ['A', 'Sure. Is the pot hot now?', '沒問題。鍋子現在熱了嗎？'], ['B', 'Yes. Put in a little oil first.', '熱了。先放一點油。'], ['A', 'How much salt do we need?', '我們需要多少鹽？'], ['B', 'Just a little. Now taste it.', '一點點就好。現在嚐嚐看。'], ['A', 'Wow, it is good!', '哇，很好喝！'], ['B', 'Great! Dinner is ready.', '太好了！晚餐準備好了。']] },

  { id: 33, topic: 'daily', title: '打電話', en: 'On the Phone', scene: '☎️', place: '打電話給朋友', npc: { name: 'Tom 的媽媽', face: '👵', g: 'f' },
    words: [['at home', '在家', '🏠'], ['hold on', '請稍等', '⏳'], ['out', '外出；不在', '🚶'], ['right now', '現在；此刻', '⚡'], ['message', '留言；訊息', '💬'], ['call back', '回電', '🔁'], ['soon', '很快；不久', '⏩'], ['phone number', '電話號碼', '☎️']],
    lines: [['A', 'Hello, is Tom at home?', '喂，請問 Tom 在家嗎？'], ['B', 'Hold on, please.', '請稍等。'], ['B', 'Sorry, he is out right now.', '抱歉，他現在出去了。'], ['A', 'Can I leave a message?', '我可以留言嗎？'], ['B', 'Of course.', '當然可以。'], ['A', 'Please ask him to call back soon.', '請他盡快回電。'], ['B', 'Does he have your phone number?', '他有你的電話號碼嗎？'], ['A', 'Yes, he does. Thank you!', '有的。謝謝您！']] },

  { id: 34, topic: 'daily', title: '看牙醫', en: 'At the Dentist', scene: '🦷', place: '牙醫診所', npc: { name: '牙醫', face: '👨‍⚕️', g: 'm' },
    words: [['dentist', '牙醫', '🧑‍⚕️'], ['tooth', '牙齒', '🦷'], ['hurts', '會痛', '🤕'], ['mouth', '嘴巴', '👄'], ['bad', '嚴重的；糟的', '👎'], ['candy', '糖果', '🍬'], ['brush', '刷', '🪥'], ['twice', '兩次', '✌️']],
    lines: [['B', 'Hi, I am your dentist today.', '你好，我是你今天的牙醫。'], ['A', 'Hello. This tooth hurts.', '你好。這顆牙齒會痛。'], ['B', 'Please open your mouth.', '請張開嘴巴。'], ['B', 'Well, it is not too bad.', '嗯，不算太嚴重。'], ['A', 'I eat a lot of candy.', '我吃很多糖果。'], ['B', 'Please eat less candy.', '請少吃糖果。'], ['B', 'And brush your teeth twice a day.', '還有，一天刷兩次牙。'], ['A', 'OK. Thank you!', '好的。謝謝你！']] },

  { id: 35, topic: 'travel', title: '換錢', en: 'Exchanging Money', scene: '💱', place: '機場換匯櫃檯', npc: { name: '櫃檯人員', face: '👩‍💼', g: 'f' },
    words: [['exchange', '兌換', '💱'], ['money', '錢', '💰'], ['dollars', '美元', '💵'], ['rate', '匯率', '📈'], ['fee', '手續費', '💲'], ['sign', '簽名', '✍️'], ['count', '數一數', '🔢'], ['coins', '硬幣', '🪙']],
    lines: [['A', 'Hello. I want to exchange some money.', '你好。我想換一些錢。'], ['B', 'Sure. How much do you want to exchange?', '好的。你想換多少？'], ['A', 'Two hundred dollars, please.', '請幫我換兩百美元。'], ['A', 'What is the rate today?', '今天的匯率是多少？'], ['B', 'It is on the screen.', '在螢幕上。'], ['A', 'Is there a fee?', '要手續費嗎？'], ['B', 'Yes, three dollars. Please sign here.', '要，三美元。請在這裡簽名。'], ['B', 'Please count your money.', '請數一數你的錢。'], ['A', 'Can I have some coins too?', '也可以給我一些硬幣嗎？']] },

  { id: 36, topic: 'travel', title: '租腳踏車', en: 'Renting a Bike', scene: '🚲', place: '腳踏車出租店', npc: { name: '店員', face: '👨‍🔧', g: 'm' },
    words: [['rent', '租', '🔑'], ['bike', '腳踏車', '🚲'], ['hour', '小時', '⏳'], ['helmet', '安全帽', '⛑️'], ['lock', '鎖', '🔒'], ['river', '河', '🏞️'], ['return', '歸還', '↩️'], ['careful', '小心的', '⚠️']],
    lines: [['A', 'Hi, can I rent a bike?', '嗨，我可以租一台腳踏車嗎？'], ['B', 'Sure. It is five dollars an hour.', '可以。一小時五美元。'], ['A', 'Two hours, please.', '兩個小時，麻煩你。'], ['B', 'Here is your helmet and a lock.', '這是你的安全帽和鎖。'], ['A', 'Where can I ride?', '我可以騎去哪裡？'], ['B', 'There is a nice path by the river.', '河邊有一條很棒的路。'], ['B', 'Please return it by five.', '請在五點前歸還。'], ['B', 'And be careful on the road.', '還有，路上要小心。'], ['A', 'OK, I will. Thanks!', '好，我會的。謝謝！']] },

  { id: 37, topic: 'daily', title: '在公園', en: 'In the Park', scene: '🌳', place: '早上的公園', npc: { name: '鄰居 Amy', face: '👩', g: 'f' },
    words: [['park', '公園', '🌳'], ['walk', '散步', '🚶'], ['tree', '樹', '🌲'], ['flower', '花', '🌸'], ['beautiful', '美麗的', '🌺'], ['bird', '鳥', '🐦'], ['bench', '長椅', '🪑'], ['dog', '狗', '🐕']],
    lines: [['B', 'Good morning! Do you come to the park often?', '早安！你常來公園嗎？'], ['A', 'Yes. I take a walk every morning.', '對。我每天早上都會散步。'], ['B', 'Look at that big tree!', '你看那棵大樹！'], ['A', 'That flower is so beautiful.', '那朵花好漂亮。'], ['B', 'Listen! A bird is singing.', '你聽！有一隻鳥在唱歌。'], ['A', "Let's sit on the bench.", '我們坐在長椅上吧。'], ['B', 'Oh, here comes my dog!', '喔，我的狗來了！'], ['A', 'He is so cute!', '牠好可愛！']] },

  { id: 38, topic: 'daily', title: '生日派對', en: 'Birthday Party', scene: '🎂', place: '朋友家', npc: { name: '朋友 Tom', face: '👨', g: 'm' },
    words: [['birthday', '生日', '🎂'], ['party', '派對', '🎉'], ['surprise', '驚喜', '🎁'], ['cake', '蛋糕', '🍰'], ['years old', '歲', '🔢'], ['sing', '唱歌', '🎤'], ['wish', '願望；許願', '🌠'], ['candles', '蠟燭', '🕯️']],
    lines: [['A', 'Happy birthday, Tom!', '生日快樂，Tom！'], ['B', 'Thank you for coming to my party!', '謝謝你來參加我的派對！'], ['A', 'Surprise! This is for you.', '驚喜！這是給你的。'], ['B', 'Wow, a cake! Thank you!', '哇，一個蛋糕！謝謝你！'], ['A', 'How old are you now?', '你現在幾歲了？'], ['B', 'I am thirty years old today.', '我今天滿三十歲。'], ['A', 'We will sing for you. Make a wish!', '我們為你唱歌。許個願吧！'], ['B', 'OK. Now I will blow out the candles.', '好。現在我要吹蠟燭了。']] },

  { id: 39, topic: 'travel', title: '轉機', en: 'Connecting Flights', scene: '🔁', place: '轉機櫃檯', npc: { name: '地勤人員', face: '👩‍✈️', g: 'f' },
    words: [['transfer', '轉機', '🔁'], ['terminal', '航廈', '🏢'], ['delayed', '延誤的', '⏰'], ['miss', '錯過', '😰'], ['on time', '準時', '⌛'], ['hurry', '趕快', '🏃'], ['screen', '螢幕', '🖥️'], ['announcement', '廣播', '📢']],
    lines: [['A', 'Excuse me, where do I transfer to Paris?', '不好意思，我要在哪裡轉機去巴黎？'], ['B', 'Go to Terminal Two.', '請到第二航廈。'], ['A', 'My first flight was delayed.', '我的第一班飛機延誤了。'], ['A', 'Will I miss my next flight?', '我會錯過下一班飛機嗎？'], ['B', 'Your next flight is on time.', '你的下一班飛機準時起飛。'], ['B', 'You have time, but please hurry.', '你還有時間，但請快一點。'], ['B', 'Check the screen for your gate.', '看螢幕確認你的登機門。'], ['A', 'Thank you! I will listen for the announcement.', '謝謝！我會注意聽廣播。']] },

  { id: 40, topic: 'travel', title: '行李不見了', en: 'Lost Luggage', scene: '🧳', place: '行李提領處', npc: { name: '行李服務人員', face: '👨‍💼', g: 'm' },
    words: [['suitcase', '行李箱', '🧳'], ['missing', '不見的', '❓'], ['baggage claim', '行李提領處', '🛄'], ['color', '顏色', '🎨'], ['name tag', '名牌', '🏷️'], ['fill out', '填寫', '✏️'], ['form', '表格', '📝'], ['deliver', '送到', '🚚']],
    lines: [['A', 'Excuse me, my suitcase is missing.', '不好意思，我的行李箱不見了。'], ['B', 'I am sorry. Did you check the baggage claim?', '很抱歉。你看過行李提領處了嗎？'], ['A', 'Yes, I waited for an hour.', '看過了，我等了一個小時。'], ['B', 'What color is it?', '它是什麼顏色？'], ['A', 'It is black, with a red name tag.', '黑色的，上面有紅色名牌。'], ['B', 'Please fill out this form.', '請填寫這張表格。'], ['B', 'We will deliver it to your hotel.', '我們會把它送到你的飯店。'], ['A', 'Thank you so much.', '非常謝謝你。']] },

  { id: 41, topic: 'daily', title: '在郵局', en: 'At the Post Office', scene: '📮', place: '郵局', npc: { name: '郵局人員', face: '👩‍💼', g: 'f' },
    words: [['post office', '郵局', '🏤'], ['send', '寄', '📤'], ['package', '包裹', '📦'], ['weigh', '秤重', '⚖️'], ['by air', '空運', '✈️'], ['arrive', '到達', '📬'], ['letter', '信', '✉️'], ['stamps', '郵票', '📮']],
    lines: [['B', 'Welcome to the post office. Can I help you?', '歡迎來到郵局。需要幫忙嗎？'], ['A', 'I want to send this package to Japan.', '我想把這個包裹寄到日本。'], ['B', 'Sure. Let me weigh it.', '好的。我秤一下。'], ['B', 'It is two kilos.', '兩公斤。'], ['A', 'How long will it take by air?', '空運要多久？'], ['B', 'It will arrive in five days.', '五天後會到。'], ['A', 'I also want to send this letter.', '我還想寄這封信。'], ['B', 'OK. You need two stamps.', '好的。你需要兩張郵票。']] },

  { id: 42, topic: 'daily', title: '剪頭髮', en: 'At the Hair Salon', scene: '💇', place: '美髮店', npc: { name: '設計師', face: '💇‍♀️', g: 'f' },
    words: [['haircut', '剪頭髮', '💇'], ['hair', '頭髮', '💈'], ['wash', '洗', '🧴'], ['style', '髮型；樣式', '✨'], ['short', '短的', '📏'], ['a little', '一點點', '🤏'], ['mirror', '鏡子', '🪞'], ['look', '看；看起來', '👀']],
    lines: [['A', 'Hi, I would like a haircut.', '嗨，我想剪頭髮。'], ['B', 'Sure. Let me wash your hair first.', '好的。我先幫你洗頭。'], ['B', 'Do you like this style?', '你喜歡這個髮型嗎？'], ['A', 'Yes, but not too short, please.', '喜歡，但請不要剪太短。'], ['B', 'OK. I will cut just a little.', '好的。我只剪一點點。'], ['B', 'All done. Look in the mirror.', '剪好了。看一下鏡子。'], ['A', 'I look great! Thank you!', '我看起來很棒！謝謝！']] },

  { id: 43, topic: 'daily', title: '運動健身', en: 'Exercise', scene: '🏃', place: '運動中心', npc: { name: '朋友 Ben', face: '👨', g: 'm' },
    words: [['exercise', '運動；健身', '🤸'], ['gym', '健身房', '🏋️'], ['run', '跑步', '🏃'], ['stretch', '伸展', '🧘'], ['legs', '腿', '🦵'], ['slow down', '放慢', '🐢'], ['minutes', '分鐘', '⏱️'], ['healthy', '健康的', '💪']],
    lines: [['B', 'Do you exercise every day?', '你每天運動嗎？'], ['A', 'Not every day. I go to the gym twice a week.', '沒有每天。我一週去兩次健身房。'], ['B', "Let's run together!", '我們一起跑步吧！'], ['A', "OK, but let's stretch first.", '好，但我們先伸展。'], ['B', 'Good idea. Stretch your legs.', '好主意。伸展一下你的腿。'], ['A', 'Please slow down! I am tired.', '請慢一點！我累了。'], ['B', 'OK. Just five more minutes.', '好。再五分鐘就好。'], ['A', 'Exercise keeps me healthy.', '運動讓我保持健康。']] },

  { id: 44, topic: 'daily', title: '四季', en: 'Seasons', scene: '🍂', place: '喝茶聊天', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['favorite', '最喜歡的', '❤️'], ['season', '季節', '🗓️'], ['spring', '春天', '🌸'], ['summer', '夏天', '☀️'], ['fall', '秋天', '🍂'], ['leaves', '葉子', '🍁'], ['snow', '雪；下雪', '☃️'], ['winter', '冬天', '❄️']],
    lines: [['B', 'What is your favorite season?', '你最喜歡哪個季節？'], ['A', 'I like spring. It is warm.', '我喜歡春天。很暖和。'], ['B', 'I like summer. I can swim every day.', '我喜歡夏天。我每天都可以游泳。'], ['A', 'Fall is nice too.', '秋天也很好。'], ['B', 'Yes, the leaves turn red and yellow.', '對，葉子會變成紅色和黃色。'], ['A', 'Does it snow in winter here?', '這裡冬天會下雪嗎？'], ['B', 'No, but it is very cold.', '不會，但是很冷。']] },

  { id: 45, topic: 'travel', title: '在海邊', en: 'At the Beach', scene: '🏖️', place: '海灘', npc: { name: '朋友 Tom', face: '👨', g: 'm' },
    words: [['beach', '海灘', '🏖️'], ['sunscreen', '防曬乳', '🧴'], ['sunglasses', '太陽眼鏡', '🕶️'], ['sand', '沙子', '⏳'], ['sea', '海', '🌊'], ['waves', '海浪', '🏄'], ['shell', '貝殼', '🐚'], ['ice cream', '冰淇淋', '🍦']],
    lines: [['B', 'What a nice day for the beach!', '今天好適合去海灘！'], ['A', 'Yes! Did you bring sunscreen?', '對啊！你有帶防曬乳嗎？'], ['B', 'Yes, and my sunglasses too.', '有，還有我的太陽眼鏡。'], ['A', 'The sand is so hot!', '沙子好燙！'], ['B', "Let's go into the sea.", '我們下海吧。'], ['A', 'Be careful. The waves are big today.', '小心。今天浪很大。'], ['B', 'Look, I found a shell!', '你看，我撿到一個貝殼！'], ['A', "Nice! Let's get some ice cream.", '真好！我們去買冰淇淋吧。']] },

  { id: 46, topic: 'travel', title: '露營', en: 'Camping', scene: '🏕️', place: '山上的營地', npc: { name: '營地管理員', face: '👨‍🌾', g: 'm' },
    words: [['tent', '帳篷', '⛺'], ['fire', '火', '🔥'], ['bugs', '蟲', '🐛'], ['dark', '暗的；天黑的', '🌑'], ['flashlight', '手電筒', '🔦'], ['camp', '露營', '🏕️'], ['mountains', '山；山區', '⛰️'], ['stars', '星星', '⭐']],
    lines: [['B', 'Welcome! You can put your tent here.', '歡迎！你可以把帳篷搭在這裡。'], ['A', 'Great! Can we make a fire?', '太好了！我們可以生火嗎？'], ['B', 'Yes, but only in this area.', '可以，但只能在這一區。'], ['A', 'Are there bugs at night?', '晚上有蟲嗎？'], ['B', 'Some. It gets dark at seven.', '有一些。七點天就黑了。'], ['B', 'Do you have a flashlight?', '你有手電筒嗎？'], ['A', 'Yes. I love to camp in the mountains.', '有。我很喜歡在山裡露營。'], ['B', 'Look up tonight. You can see many stars.', '今晚抬頭看看。你可以看到很多星星。']] },

  { id: 47, topic: 'travel', title: '買網路卡', en: 'Getting a SIM Card', scene: '📶', place: '電信門市', npc: { name: '店員', face: '👩‍💼', g: 'f' },
    words: [['SIM card', 'SIM 卡（手機網路卡）', '📱'], ['week', '一週', '📆'], ['unlimited', '無限的；吃到飽的', '♾️'], ['data', '網路流量', '📊'], ['internet', '網路', '🌐'], ['signal', '訊號', '📶'], ['battery', '電池', '🔋'], ['charger', '充電器', '🔌']],
    lines: [['A', 'Hi, I need a SIM card.', '嗨，我需要一張 SIM 卡。'], ['B', 'How long will you stay?', '你會待多久？'], ['A', 'One week.', '一個星期。'], ['B', 'This one has unlimited data.', '這張的網路流量吃到飽。'], ['A', 'Great. Is the internet fast?', '太好了。網路快嗎？'], ['B', 'Yes, and the signal is good everywhere.', '很快，而且到處訊號都很好。'], ['A', 'Also, my battery is low.', '還有，我的電池快沒電了。'], ['A', 'Can I buy a charger here?', '我可以在這裡買充電器嗎？'], ['B', 'Sure. It is right here.', '當然。就在這裡。']] },

  { id: 48, topic: 'travel', title: '市場買水果', en: 'At the Market', scene: '🥭', place: '當地傳統市場', npc: { name: '水果攤老闆', face: '👨‍🦳', g: 'm' },
    words: [['market', '市場', '🍉'], ['mango', '芒果', '🥭'], ['sweet', '甜的', '🍯'], ['kilo', '公斤', '⚖️'], ['cheaper', '更便宜的', '⬇️'], ['strawberries', '草莓', '🍓'], ['basket', '籃子；一籃', '🧺'], ['deal', '成交', '🤝']],
    lines: [['A', 'This market is so busy!', '這個市場好熱鬧！'], ['B', 'Try a mango. It is very sweet.', '試吃一顆芒果。很甜喔。'], ['A', 'Wow, it is sweet! How much for a kilo?', '哇，真的很甜！一公斤多少錢？'], ['B', 'Eight dollars a kilo.', '一公斤八美元。'], ['A', 'Can you make it cheaper?', '可以算便宜一點嗎？'], ['B', 'OK, seven dollars. And the strawberries?', '好吧，七美元。那草莓呢？'], ['A', 'One basket of strawberries, please.', '請給我一籃草莓。'], ['B', 'Deal! Here you go.', '成交！給你。']] },

  { id: 49, topic: 'daily', title: '我的家', en: 'My Home', scene: '🏠', place: '參觀新家', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['house', '房子', '🏠'], ['living room', '客廳', '📺'], ['sofa', '沙發', '🛋️'], ['window', '窗戶', '🪟'], ['bedroom', '臥室', '🛏️'], ['stairs', '樓梯', '🪜'], ['garden', '花園', '🌷'], ['quiet', '安靜的', '🤫']],
    lines: [['A', 'Welcome to my new house!', '歡迎來到我的新家！'], ['B', 'Wow, the living room is so big.', '哇，客廳好大。'], ['A', 'Sit on the sofa. It is soft.', '坐沙發吧。很軟喔。'], ['B', 'I love this big window.', '我很喜歡這扇大窗戶。'], ['A', 'My bedroom is up the stairs.', '我的臥室在樓上。'], ['B', 'Do you have a garden?', '你有花園嗎？'], ['A', 'Yes, a small one. It is very quiet here.', '有，一個小花園。這裡很安靜。']] },

  { id: 50, topic: 'daily', title: '做家事', en: 'Housework', scene: '🧹', place: '週末在家', npc: { name: '室友 Amy', face: '👩', g: 'f' },
    words: [['messy', '亂的', '🌀'], ['tidy', '整理', '🧺'], ['do the dishes', '洗碗', '🍽️'], ['vacuum', '吸地', '🧹'], ['take out', '拿出去', '📤'], ['trash', '垃圾', '🗑️'], ['laundry', '要洗的衣服', '👕'], ['fold', '摺', '🧦']],
    lines: [['B', 'Our room is so messy!', '我們的房間好亂！'], ['A', "Let's tidy it up together.", '我們一起整理吧。'], ['B', 'I will do the dishes.', '我來洗碗。'], ['A', 'OK. I will vacuum the living room.', '好。我來吸客廳的地。'], ['B', 'Can you take out the trash too?', '你也可以把垃圾拿出去嗎？'], ['A', 'Sure. Is the laundry dry?', '沒問題。衣服乾了嗎？'], ['B', "Yes. Let's fold it now.", '乾了。我們現在來摺衣服。'], ['A', 'Great! Now the house is clean.', '太好了！現在家裡乾淨了。']] },

  { id: 51, topic: 'daily', title: '寵物', en: 'Pets', scene: '🐈', place: '鄰居家', npc: { name: '鄰居 Ben', face: '👨', g: 'm' },
    words: [['pet', '寵物', '🐾'], ['cat', '貓', '🐈'], ['soft', '柔軟的', '🪶'], ['feed', '餵', '🍖'], ['bowl', '碗', '🥣'], ['play', '玩', '🎾'], ['toy', '玩具', '🧸'], ['take care of', '照顧', '🤲']],
    lines: [['A', 'Do you have a pet?', '你有養寵物嗎？'], ['B', 'Yes, this is my cat, Lucky.', '有，這是我的貓 Lucky。'], ['A', 'She is so soft!', '牠好軟！'], ['B', 'Do you want to feed her?', '你想餵牠嗎？'], ['A', 'Yes! Where is her bowl?', '想！牠的碗在哪裡？'], ['B', 'Here. She also likes to play.', '在這裡。牠也很喜歡玩。'], ['A', 'Can I give her this toy?', '我可以給牠這個玩具嗎？'], ['B', 'Sure. Thank you for helping me take care of her.', '當然。謝謝你幫我照顧牠。']] },

  { id: 52, topic: 'travel', title: '餐廳訂位', en: 'Booking a Table', scene: '📞', place: '打電話到餐廳', npc: { name: '餐廳人員', face: '🤵', g: 'm' },
    words: [['book', '預訂', '📞'], ['tonight', '今晚', '🌃'], ['people', '人；人數', '👥'], ["o'clock", '點鐘', '🕖'], ['full', '客滿的', '🈵'], ['outside', '外面；戶外', '🌳'], ['last name', '姓氏', '🪪'], ['see you', '到時見', '👋']],
    lines: [['B', 'Hello, this is Rose Restaurant.', '你好，這裡是玫瑰餐廳。'], ['A', 'Hi. Can I book a table for tonight?', '嗨。我可以訂今晚的位子嗎？'], ['B', 'Sure. How many people?', '好的。請問幾位？'], ['A', "Four people, at seven o'clock.", '四位，七點。'], ['B', "Sorry, seven o'clock is full.", '抱歉，七點已經客滿了。'], ['B', 'We have a table outside at eight.', '我們八點有戶外的位子。'], ['A', 'That is fine. My last name is Lin.', '可以。我姓林。'], ['B', 'Thank you. See you tonight!', '謝謝。今晚見！']] },

  { id: 53, topic: 'travel', title: '逛夜市', en: 'Night Market', scene: '🏮', place: '夜市', npc: { name: '朋友 Tom', face: '👨', g: 'm' },
    words: [['night market', '夜市', '🏮'], ['snack', '小吃', '🍢'], ['stinky tofu', '臭豆腐', '🧆'], ['smell', '聞起來', '👃'], ['fried', '炸的', '🍤'], ['bubble tea', '珍珠奶茶', '🧋'], ['line', '隊伍', '🚶'], ['share', '分享', '🤝']],
    lines: [['A', 'I love the night market!', '我好喜歡夜市！'], ['B', 'Try this snack. It is stinky tofu.', '吃吃看這個小吃。這是臭豆腐。'], ['A', 'It does not smell good!', '聞起來不太香！'], ['B', 'But it tastes great. It is fried.', '但是很好吃。這是炸的。'], ['A', 'Wow, you are right!', '哇，你說得對！'], ['B', "Let's get some bubble tea.", '我們去買珍珠奶茶吧。'], ['A', 'Wow, the line is so long.', '哇，隊伍好長。'], ['B', 'It is popular. We can share one.', '它很受歡迎。我們可以一起喝一杯。']] },

  { id: 54, topic: 'daily', title: '看電影', en: 'At the Cinema', scene: '🎬', place: '電影院', npc: { name: '朋友 Ben', face: '👨', g: 'm' },
    words: [['starts', '開始', '▶️'], ['popcorn', '爆米花', '🍿'], ['row', '排', '💺'], ['scary', '恐怖的', '👻'], ['funny', '好笑的', '😂'], ['turn off', '關掉', '📴'], ['ending', '結局', '🎞️'], ['cinema', '電影院', '🎬']],
    lines: [['B', 'The movie starts at eight.', '電影八點開始。'], ['A', "Let's get some popcorn first.", '我們先買爆米花吧。'], ['B', 'Our seats are in row five.', '我們的座位在第五排。'], ['A', 'Is this movie scary?', '這部電影恐怖嗎？'], ['B', 'No, it is funny.', '不會，很好笑。'], ['A', 'Please turn off your phone.', '請把手機關機。'], ['B', 'The ending was so good!', '結局好棒！'], ['A', "Yes! Let's come to this cinema again.", '對！我們下次再來這間電影院吧。']] },

  { id: 55, topic: 'daily', title: '便利商店', en: 'Convenience Store', scene: '🏪', place: '便利商店', npc: { name: '店員', face: '👩‍💼', g: 'f' },
    words: [['heat up', '加熱', '♨️'], ['lunch box', '便當', '🍱'], ['chopsticks', '筷子', '🥢'], ['straw', '吸管', '🥤'], ['plastic bag', '塑膠袋', '🛍️'], ['change', '零錢', '🪙'], ['convenience store', '便利商店', '🏪'], ['every day', '每天', '📅']],
    lines: [['A', 'Can you heat up this lunch box?', '可以幫我加熱這個便當嗎？'], ['B', 'Sure. Do you need chopsticks?', '好的。需要筷子嗎？'], ['A', 'Yes, please. And a straw for my tea.', '要，麻煩你。還要一根吸管給我的茶。'], ['B', 'Do you need a plastic bag?', '需要塑膠袋嗎？'], ['A', 'No, thank you. I have a bag.', '不用，謝謝。我有袋子。'], ['B', 'That is five dollars. Here is your change.', '一共五美元。這是找你的零錢。'], ['A', 'I come to this convenience store every day.', '我每天都來這間便利商店。']] },

  { id: 56, topic: 'travel', title: '搭渡輪', en: 'Taking a Ferry', scene: '⛴️', place: '碼頭', npc: { name: '船公司人員', face: '👨‍✈️', g: 'm' },
    words: [['ferry', '渡輪', '⛴️'], ['leave', '出發；離開', '🚢'], ['every', '每', '🔁'], ['island', '島', '🏝️'], ['deck', '甲板', '⚓'], ['life jacket', '救生衣', '🦺'], ['seasick', '暈船的', '🤢'], ['boat', '船', '🚤']],
    lines: [['A', 'When does the next ferry leave?', '下一班渡輪什麼時候出發？'], ['B', 'Every hour. The next one is at ten.', '每小時一班。下一班是十點。'], ['A', 'How long does it take to the island?', '到島上要多久？'], ['B', 'About forty minutes.', '大約四十分鐘。'], ['A', 'Can I sit on the deck?', '我可以坐在甲板上嗎？'], ['B', 'Yes, but please wear a life jacket.', '可以，但請穿救生衣。'], ['A', 'I get seasick on a boat.', '我坐船會暈船。'], ['B', 'Sit in the middle. It helps.', '坐中間，會比較好。']] },

  { id: 57, topic: 'travel', title: '規劃行程', en: 'Planning a Trip', scene: '🗾', place: '咖啡店討論', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['trip', '旅程', '🧳'], ['Japan', '日本', '🗾'], ['fly', '搭飛機', '🛩️'], ['first', '首先', '1️⃣'], ['city', '城市', '🏙️'], ['then', '然後', '⏭️'], ['temple', '寺廟', '⛩️'], ['budget', '預算', '💳']],
    lines: [['B', 'Where do you want to go for our trip?', '我們這趟旅行你想去哪裡？'], ['A', "Let's go to Japan!", '我們去日本吧！'], ['B', 'Good idea. We can fly to Tokyo.', '好主意。我們可以搭飛機去東京。'], ['A', 'First, we stay in the city for three days.', '首先，我們在城市裡待三天。'], ['B', 'Then we can take a train to Kyoto.', '然後我們可以搭火車去京都。'], ['A', 'I want to see an old temple.', '我想去看古老的寺廟。'], ['B', 'What is our budget?', '我們的預算是多少？'], ['A', 'About two thousand dollars each.', '每人大約兩千美元。']] },

  { id: 58, topic: 'daily', title: '朋友來作客', en: 'Having Guests', scene: '🚪', place: '家裡', npc: { name: '朋友 Tom', face: '👨', g: 'm' },
    words: [['come in', '請進', '🚪'], ['invite', '邀請', '💌'], ['take off', '脫掉', '👟'], ['slippers', '拖鞋', '🩴'], ['cookies', '餅乾', '🍪'], ['bring', '帶來', '🎁'], ['glad', '高興的', '😄'], ['enjoy', '享受；喜歡', '😊']],
    lines: [['A', 'Hi, Tom! Come in, please.', '嗨，Tom！請進。'], ['B', 'Thanks for the invite!', '謝謝你的邀請！'], ['A', 'Please take off your shoes.', '請把鞋子脫掉。'], ['A', 'Here are some slippers.', '這裡有拖鞋。'], ['B', 'These cookies are for you.', '這些餅乾是給你的。'], ['A', 'Thank you! You did not have to bring anything.', '謝謝！你不用帶東西來的。'], ['A', 'I am so glad you are here.', '你來我好高興。'], ['B', 'Me too. I always enjoy visiting you.', '我也是。我一直都很喜歡來找你。']] },

  { id: 59, topic: 'daily', title: '聊聊旅行', en: 'Talking About a Trip', scene: '📸', place: '旅行回來後', npc: { name: '朋友 Amy', face: '👩', g: 'f' },
    words: [['back', '回來', '↩️'], ['amazing', '很棒的', '🤩'], ['went', '去了', '✈️'], ['last week', '上週', '📆'], ['saw', '看到了', '🗻'], ['ate', '吃了', '🍣'], ['bought', '買了', '🛍️'], ['great time', '愉快的時光', '🥳']],
    lines: [['B', 'Welcome back! How was your trip?', '歡迎回來！旅行怎麼樣？'], ['A', 'It was amazing!', '太棒了！'], ['B', 'Where did you go?', '你去了哪裡？'], ['A', 'I went to Japan last week.', '我上週去了日本。'], ['A', 'I saw Mount Fuji. It was beautiful.', '我看到了富士山。好美。'], ['B', 'What did you eat?', '你吃了什麼？'], ['A', 'I ate a lot of sushi.', '我吃了很多壽司。'], ['A', 'And I bought this gift for you.', '還有，我買了這個禮物給你。'], ['B', 'Thank you! You had a great time!', '謝謝！你玩得真開心！']] },

  { id: 60, topic: 'travel', title: '道別與保持聯絡', en: 'Keeping in Touch', scene: '💌', place: '旅程的最後一天', npc: { name: '新朋友 Emma', face: '👩‍🦰', g: 'f' },
    words: [['keep in touch', '保持聯絡', '📱'], ['email', '電子郵件', '📧'], ['add', '加（好友）', '➕'], ['next year', '明年', '🗓️'], ['remember', '記得', '🧠'], ['hug', '擁抱', '🤗'], ['take care', '保重', '💐'], ['safe trip', '一路平安', '🛫']],
    lines: [['B', 'Today is your last day here.', '今天是你在這裡的最後一天。'], ['A', 'Yes. I will miss you, Emma.', '對。我會想念你的，Emma。'], ['B', "Let's keep in touch!", '我們保持聯絡吧！'], ['A', 'Sure. Here is my email.', '好啊。這是我的電子郵件。'], ['B', 'I will add you on my phone.', '我會用手機加你好友。'], ['A', 'Come visit me in Taiwan next year!', '明年來台灣找我玩！'], ['B', 'I will! I will always remember this trip.', '我會的！我會一直記得這趟旅行。'], ['A', 'Can I give you a hug?', '我可以抱你一下嗎？'], ['B', 'Of course! Take care and have a safe trip.', '當然！保重，一路平安。']] }
];

/* 中文句子裡重點單字對應的詞（自動找不到時才用這張表），格式：「單元|英文單字|中文句子」→ 要畫底線的中文 */
window.ZH_MARK = {
 "3|how many|哈囉！要幾顆蘋果？": "幾顆",
 "9|bag|有，一件。": "一件",
 "9|window seat|我可以坐靠窗的位子嗎？": "靠窗的位子",
 "10|meal|用餐時間到了。牛肉還是魚？": "用餐",
 "12|holiday|我來這裡度假。": "度假",
 "13|sunny|好。希望明天是晴天！": "晴天",
 "14|stop|請先在車站停一下。": "停一下",
 "15|next|下一班火車是什麼時候？": "下一班",
 "18|floor|你的房間在五樓。": "五樓",
 "20|busy|喜歡，但是我很忙。": "很忙",
 "20|meeting|我要跟老闆開會。": "開會",
 "22|separately|好的。一起付還是分開付？": "分開",
 "22|separately|我們分開付。": "分開",
 "22|pay|我們分開付。": "付",
 "24|photos|我可以拍照嗎？": "拍照",
 "25|help|不好意思。你可以幫我嗎？": "幫我",
 "25|photo|你可以幫我們拍張照嗎？": "拍張照",
 "25|slowly|你可以說慢一點嗎？": "慢一點",
 "25|again|你可以再拍一張嗎？": "再",
 "26|call|好。我星期六打給你。": "打給你",
 "27|each|是的。每個十元。": "每個",
 "33|out|抱歉，他現在出去了。": "出去了",
 "33|soon|請他盡快回電。": "盡快",
 "35|exchange|你好。我想換一些錢。": "換",
 "35|exchange|好的。你想換多少？": "換",
 "37|beautiful|那朵花好漂亮。": "漂亮",
 "38|wish|我們為你唱歌。許個願吧！": "許個願",
 "39|hurry|你還有時間，但請快一點。": "快一點",
 "41|weigh|好的。我秤一下。": "秤一下",
 "41|arrive|五天後會到。": "會到",
 "42|hair|好的。我先幫你洗頭。": "頭",
 "43|slow down|請慢一點！我累了。": "慢一點",
 "45|waves|小心。今天浪很大。": "浪",
 "46|dark|有一些。七點天就黑了。": "天就黑了",
 "47|week|一個星期。": "一個星期",
 "48|cheaper|可以算便宜一點嗎？": "便宜一點",
 "49|house|歡迎來到我的新家！": "家",
 "49|stairs|我的臥室在樓上。": "樓上",
 "50|vacuum|好。我來吸客廳的地。": "吸",
 "50|laundry|沒問題。衣服乾了嗎？": "衣服",
 "51|soft|牠好軟！": "軟",
 "52|book|嗨。我可以訂今晚的位子嗎？": "訂",
 "52|people|好的。請問幾位？": "幾位",
 "52|people|四位，七點。": "四位",
 "52|o'clock|四位，七點。": "七點",
 "52|o'clock|抱歉，七點已經客滿了。": "七點",
 "52|last name|可以。我姓林。": "姓",
 "52|see you|謝謝。今晚見！": "見",
 "53|share|它很受歡迎。我們可以一起喝一杯。": "一起喝",
 "54|turn off|請把手機關機。": "關機",
 "57|trip|我們這趟旅行你想去哪裡？": "旅行",
 "58|bring|謝謝！你不用帶東西來的。": "帶東西",
 "59|amazing|太棒了！": "太棒了",
 "59|great time|謝謝！你玩得真開心！": "玩得真開心",
 "60|hug|我可以抱你一下嗎？": "抱你一下"
};
