const mysql  = require("mysql2");
const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  database:"project1",
  password:"sujith_18@",
});

const datas = [["Cozy Beachfront Cottage","Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.","https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",1500,"Malibu","United States"],
["Modern Loft in Downtown","Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!","https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",1200,"New York City","United States"],
[
  "Mountain Retreat",
  "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  1000,
  "Aspen",
  "United States"
],
[
  "Historic Villa in Tuscany",
  "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  2500,
  "Florence",
  "Italy"
],
[
  "Secluded Treehouse Getaway",
  "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  800,
  "Portland",
  "United States"
],
[
  "Beachfront Paradise",
  "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  2000,
  "Cancun",
  "Mexico"
],
[
  "Rustic Cabin by the Lake",
  "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  900,
  "Lake Tahoe",
  "United States"
],
[
  "Luxury Penthouse with City Views",
  "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
  "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  3500,
  "Los Angeles",
  "United States"
],
[
  "Ski-In/Ski-Out Chalet",
  "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
  "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  3000,
  "Verbier",
  "Switzerland"
],
[
  "Safari Lodge in the Serengeti",
  "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  4000,
  "Serengeti National Park",
  "Tanzania"
],
[
  "Historic Canal House",
  "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  1800,
  "Amsterdam",
  "Netherlands"
],
[
  "Private Island Retreat",
  "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
  "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  10000,
  "Fiji",
  "Fiji"
],
[
  "Charming Cottage in the Cotswolds",
  "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
  "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  1200,
  "Cotswolds",
  "United Kingdom"
],
[
  "Historic Brownstone in Boston",
  "Step back in time in this elegant historic brownstone located in the heart of Boston.",
  "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  2200,
  "Boston",
  "United States"
],
[
  "Beachfront Bungalow in Bali",
  "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
  "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  1800,
  "Bali",
  "Indonesia"
],
[
  "Mountain View Cabin in Banff",
  "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
  "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  1500,
  "Banff",
  "Canada"
],
[
  "Art Deco Apartment in Miami",
  "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
  "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  1600,
  "Miami",
  "United States"
],
[
  "Tropical Villa in Phuket",
  "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
  "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  3000,
  "Phuket",
  "Thailand"
],
[
  "Historic Castle in Scotland",
  "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
  "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  4000,
  "Scottish Highlands",
  "United Kingdom"
],
[
  "Desert Oasis in Dubai",
  "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  5000,
  "Dubai",
  "United Arab Emirates"
],
[
  "Rustic Log Cabin in Montana",
  "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
  "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  1100,
  "Montana",
  "United States"
],
[
  "Beachfront Villa in Greece",
  "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  2500,
  "Mykonos",
  "Greece"
],
[
  "Eco-Friendly Treehouse Retreat",
  "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
  "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  750,
  "Costa Rica",
  "Costa Rica"
],
[
  "Historic Cottage in Charleston",
  "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
  "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  1600,
  "Charleston",
  "United States"
],
[
  "Modern Apartment in Tokyo",
  "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  2000,
  "Tokyo",
  "Japan"
]];

let q = "insert into info(title,description,image,price,location,country) values?"

try{
  connection.query(q,[datas],(err,res)=>{
    if (err) throw err;
    console.log("insertion in complete");
  })
}catch(err){
  console.log(err);
  console.log("some error in insertion")
}
