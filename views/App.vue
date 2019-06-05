<template>

    <div class="app-main">
        <nav class="navbar navbar__menu" id="primary-navbar">
            <div class="navbar-header">
				<div style="cursor:pointer;" class="navbar-brand" @click.stop="go_home()"></div>
				<div id="langs_read">
					<img src="/images/read.png" style="margin-right:10px;height:30px;">
					<span id="langs_read_text">Read in:</span>
				</div>
				<div id="langs" @click.stop="select_show()">En</div>
				<select id="langs_hide" @change.prevent="select_lang()">
					<option value="">Choose language</option>
					<option value="af">Afrikaans</option>
					<option value="am">አማርኛ</option>
					<option value="ar">العربية</option>
					<option value="az">Azərbaycan</option>
					<option value="be">беларускі</option>
					<option value="bg">български</option>
					<option value="bn">বাঙালি</option>
					<option value="bs">Bosanski</option>
					<option value="ca">Català</option>
					<option value="ceb">Cebuano</option>
					<option value="co">Corsa</option>
					<option value="cs">Česky</option>
					<option value="cy">Cymraeg</option>
					<option value="da">dansk</option>
					<option value="de">Deutsch</option>
					<option value="el">Ελληνικά</option>
					<option value="en">English</option>
					<option value="eo">Esperanto</option>
					<option value="es">Español</option>
					<option value="et">Eesti keel</option>
					<option value="eu">Euskal</option>
					<option value="fa">فارسی</option>
					<option value="fi">suomalainen</option>
					<option value="fr">Le français</option>
					<option value="fy">Frysk</option>
					<option value="ga">Gaeilge</option>
					<option value="gd">Gàidhlig</option>
					<option value="gl">Galego</option>
					<option value="gu">ગુજરાતી</option>
					<option value="ha">Gidan</option>
					<option value="haw">Hawaiian</option>
					<option value="hi">हिन्दी</option>
					<option value="hmn">Hmoob</option>
					<option value="hr">hrvatski</option>
					<option value="ht">Ayisyen</option>
					<option value="hu">magyar</option>
					<option value="hy">Հայերեն</option>
					<option value="id">Orang indonesia</option>
					<option value="ig">Igbo</option>
					<option value="is">Íslensku</option>
					<option value="it">italiano</option>
					<option value="iw">עברית</option>
					<option value="ja">日本語</option>
					<option value="jw">Jawa</option>
					<option value="ka">ქართული</option>
					<option value="kk">Қазақша</option>
					<option value="km">ភាសាខ្មែរ</option>
					<option value="kn">ಕನ್ನಡ</option>
					<option value="ko">한국어</option>
					<option value="ku">Kurdî</option>
					<option value="ky">Кыргыз</option>
					<option value="la">Latine</option>
					<option value="lb">Lëtzebuergesch</option>
					<option value="lo">ລາວ</option>
					<option value="lt">Lietuvių</option>
					<option value="lv">Latviešu valoda</option>
					<option value="mg">Malagasy</option>
					<option value="mi">Maori</option>
					<option value="mk">Македонски</option>
					<option value="ml">മലയാളം</option>
					<option value="mn">Монгол хэл дээр</option>
					<option value="mr">मराठी</option>
					<option value="ms">Melayu</option>
					<option value="mt">Malti</option>
					<option value="my">မြန်မာ</option>
					<option value="ne">नेपाली</option>
					<option value="nl">Nederlands</option>
					<option value="no">norsk</option>
					<option value="ny">Nyanja</option>
					<option value="pa">ਪੰਜਾਬੀ</option>
					<option value="pl">Polski</option>
					<option value="ps">پښتو</option>
					<option value="pt">Português</option>
					<option value="ro">românesc</option>
					<option value="ru">Русский</option>
					<option value="sd">سنڌي</option>
					<option value="si">සිංහල</option>
					<option value="sk">slovenský</option>
					<option value="sl">Slovenščina</option>
					<option value="sm">Samoa</option>
					<option value="sn">Shona</option>
					<option value="so">Soomaaliya</option>
					<option value="sq">shqiptar</option>
					<option value="sr">Сербиан</option>
					<option value="st">Soto ka boroa</option>
					<option value="su">Sunda</option>
					<option value="sv">Svenska</option>
					<option value="sw">Kiswahili</option>
					<option value="ta">தமிழ்</option>
					<option value="te">తెలుగు</option>
					<option value="tg">Тоҷикӣ</option>
					<option value="th">ไทย</option>
					<option value="tl">Filipino</option>
					<option value="tr">Türk</option>
					<option value="uk">Український</option>
					<option value="ur">اردو</option>
					<option value="uz">O'zbek</option>
					<option value="vi">Tiếng việt</option>
					<option value="xh">Spit</option>
					<option value="yi">Yiddish</option>
					<option value="yo">Yorùbá</option>
					<option value="zh">中國</option>
					<option value="zu">Zulu</option>
				</select>
				<div class="navbar-menu-btn" @click.stop="menu = !menu"></div>
            </div>
            <transition mode="out-in" name="slide-fade">
                <div class="navbar-menu" v-if="menu">
                    <div class="navbar-menu-info">
                        <span style="text-align:center;" class="__font-size-14 __text-center">Freenity technology makes it possible to create your own website, thanks to which you can share information and news of your community with people from different countries in their language</span>
                    <br>
					<span style="text-align:center;">
					<a style="color:#fff;" href="http://www.freenity.info" target="blank">www.freenity.info</a><br>
					<a style="color:#fff;" href="https://www.instagram.com/freenitynews" target="blank">www.instagram.com/freenitynews</a><br>
					<a style="color:#fff;" href="mailto:freenitynews@gmail.com">freenitynews@gmail.com</a>
					</span>
					</div>
                    <div class="navbar-menu-links">
                        <span id="openf" @click.stop="openf()">
                            <i class="mdi mdi-star text-warning mr-2" style="margin-top:1px;"></i>
                            Favourites
                        </span>

                        <router-link :to="{ name: 'login' }" v-if="!$auth.check()" @click.native="menu = !menu">Log in / Sign in</router-link>
                        <a href="#" @click.prevent="logout()" v-if="$auth.check()">Log out</a>
                    </div>
                </div>
            </transition>
        </nav>

        <div class="main-background"></div>

        <keep-alive include="messages,favourites" max="10">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import SystemConst from './utils/const.js'

document.addEventListener("DOMContentLoaded", function(event) { 

	var langs_read_text = {
		af:"Lees in", 
		am:"ያንብቡ", 
		ar:"قراءة في",
		az:"Oxuyun",
		be:"чытаць у",
		bg:"Прочетете",
		bn:"পড়ুন",
		bs:"Pročitajte",
		ca:"Llegiu",
		ceb:"Basaha sa",
		co:"Leggi in",
		cs:"Číst dál",
		cy:"Darllenwch i mewn",
		da:"Læs ind",
		de:"Lesen Sie in",
		el:"Διαβάστε παρακάτω",
		en:"Read in",
		eo:"Legu en",
		es:"Leer en",
		et:"Loe",
		eu:"Irakurri",
		fa:"خواندن در",
		fi:"Lue",
		fr:"Lu dans",
		fy:"Lês yn",
		ga:"Léigh isteach",
		gd:"Leugh a-steach",
		gl:"Ler en",
		gu:"વાંચો",
		ha:"Karanta a",
		haw:"Heluhelu i loko",
		hi:"में पढ़ें",
		hmn:"Nyeem rau hauv",
		hr:"Pročitajte",
		ht:"Li nan",
		hu:"Olvassa el",
		hy:"Կարդացեք",
		id:"Baca masuk",
		ig:"Gụọ na",
		is:"Lesa inn",
		it:"Leggi dentro",
		iw:"קרא ב",
		ja:"読む",
		jw:"Maca ing",
		ka:"წაიკითხეთ",
		kk:"Оқыңыз",
		km:"អាន",
		kn:"ಓದಿ",
		ko:"읽기",
		ku:"Bixwînin",
		ky:"окуу",
		la:"read",
		lb:"Gelies",
		lo:"ອ່ານໃນ",
		lt:"Skaitykite",
		lv:"Lasīt",
		mg:"Vakio ao",
		mi:"Pānuihia",
		mk:"Прочитајте",
		ml:"വായിക്കുക",
		mn:"Уншсан",
		mr:"वाचा",
		ms:"Baca dalam",
		mt:"Aqra f",
		my:"ဖတ်",
		ne:"पढ्नु",
		nl:"Inlezen",
		no:"Les inn",
		ny:"Lowani mkati",
		pa:"ਵਿਚ ਪੜ੍ਹੋ",
		pl:"Czytaj dalej",
		ps:"لوستل",
		pt:"Ler em",
		ro:"Citiți în",
		ru:"Читать в",
		sd:"پڙهو",
		si:"කියවන්න",
		sk:"Čítajte ďalej",
		sl:"Preberite si",
		sm:"Faitau i totonu",
		sn:"Verenga mukati",
		so:"Akhri gudaha",
		sq:"Lexo në",
		sr:"Прочитајте",
		st:"Bala ho",
		su:"maca",
		sv:"Läs in",
		sw:"Soma ndani",
		ta:"படிக்கவும்",
		te:"చదువు",
		tg:"Дар бораи хондан",
		th:"อ่านใน",
		tl:"Basahin ang sa",
		tr:"Okuyun",
		uk:"Читати в",
		ur:"اندر پڑھو",
		uz:"O'qish",
		vi:"Đọc trong",
		xh:"Funda ngaphakathi",
		yi:"לייענען אין",
		yo:"Ka ninu",
		zh:"读入",
		zu:"Funda ngaphakathi"
	};

	var urls=window.location.href.split("?");
	if (urls[1]) {
		var url=urls[1].split("=");
		if (url[0]=='lang') {
			document.getElementById("langs_hide").value = url[1];
			document.getElementById("langs").innerHTML = url[1];
			document.getElementById("langs_read_text").innerHTML = langs_read_text[url[1]];
		}
	}

	$.ajax({
	  url:'/api/settings/5cc2d4d067c2ffe4d6162f58',
	  type:'GET',
	  success:function(json){
		  console.log(json.data);

		  document.title = json.data.title;

		  //$('.navbar-header').css('background',json.data.header);

		  $('head').append('<style>.navbar-brand:before{background: url("'+json.data.files[0].url+'") no-repeat center;background-size: cover;}</style>');
		  
	//	  $('.main-background').attr('style',"background: url('"+json.data.files[1].url+"') repeat;background-size: cover;");

	  }
	})	
});

export default {
    data() {
        return {
            menu: false,
            topics: SystemConst.topics
        }
    },
    mounted() {
        let app = this

        addEventListener('click', function (e) {
            let DOMmenu = document.getElementById('primary-navbar')

            if (!DOMmenu.contains(e.target)) {
                app.menu = false
            }
        })
    },
    methods: {
        logout() {
            this.menu = false
            this.$auth.logout()
        },
		go_home () {
			var urls=window.location.href.split("?");
			if (urls[1]) {
				var url=urls[1].split("=");
				if (url[0]=='lang') {
					if (url[1]!='') window.location.href='?lang='+url[1];
					else window.location.href='/'; 
				}
			} else 	window.location.href='/'; 
		},
		select_lang () {
			var lang = document.getElementById("langs_hide").value;
			var urls = window.location.href.split("/");
			if (lang!='') window.location.href=window.location.pathname+'?lang='+lang;
			else window.location.href=window.location.pathname; 
		},
		openf() {
			window.location.href = "/favourites";
        },
    }
}
</script>
<style>
#openf {
	cursor:pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 50%;
    height: 32px;
    margin: 11px 0px;
    font-size: 14px;
    line-height: 21px;
    color: #fff;
    text-align: center;
    text-decoration: none;
}

#langs_hide {
    opacity: 0;
	position: absolute;
    right: 90px;
	z-index:2;
	width: 28px;
    height: 28px;
}

#langs {
	cursor:pointer;
    position: absolute;
    right: 90px;
	z-index:1;
	display: inline-block;
	line-height: 17px;
    border-radius: 28px;
	background:#ffffff;
    color: black;
    font-size: 14px;
    overflow: hidden;
	font-weight: bold;
	outline: none;
	padding:7px;
	text-transform: uppercase;
}
</style>