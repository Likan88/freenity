const mongoose = require('mongoose')
const trunks = require('trunks-log')
const log = new trunks('MESSAGES')
const { Favourite } = require('./index')

const definition = {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: null
    },
	title_af: {
        type: String,
        default: null
    },
	title_am: {
        type: String,
        default: null
    },
	title_ar: {
        type: String,
        default: null
    },
	title_az: {
        type: String,
        default: null
    },
	title_be: {
        type: String,
        default: null
    },
	title_bg: {
        type: String,
        default: null
    },
	title_bn: {
        type: String,
        default: null
    },
	title_bs: {
        type: String,
        default: null
    },	
	title_ca: {
        type: String,
        default: null
    },		
	title_ceb: {
        type: String,
        default: null
    },	
	title_co: {
        type: String,
        default: null
    },	
	title_cs: {
        type: String,
        default: null
    },	
	title_cy: {
        type: String,
        default: null
    },	
	title_da: {
        type: String,
        default: null
    },	
	title_de: {
        type: String,
        default: null
    },	
	title_el: {
        type: String,
        default: null
    },	
	title_en: {
        type: String,
        default: null
    },	
	title_eo: {
        type: String,
        default: null
    },	
	title_es: {
        type: String,
        default: null
    },	
	title_et: {
        type: String,
        default: null
    },	
	title_eu: {
        type: String,
        default: null
    },	
	title_fa: {
        type: String,
        default: null
    },		
	title_fi: {
        type: String,
        default: null
    },		
	title_fr: {
        type: String,
        default: null
    },	
	title_fy: {
        type: String,
        default: null
    },	
	title_ga: {
        type: String,
        default: null
    },	
	title_gd: {
        type: String,
        default: null
    },	
	title_gl: {
        type: String,
        default: null
    },	
	title_gu: {
        type: String,
        default: null
    },	
	title_ha: {
        type: String,
        default: null
    },	
	title_haw: {
        type: String,
        default: null
    },	
	title_hi: {
        type: String,
        default: null
    },	
	title_hmn: {
        type: String,
        default: null
    },	
	title_hr: {
        type: String,
        default: null
    },	
	title_ht: {
        type: String,
        default: null
    },	
	title_hu: {
        type: String,
        default: null
    },	
	title_hy: {
        type: String,
        default: null
    },	
	title_id: {
        type: String,
        default: null
    },	
	title_ig: {
        type: String,
        default: null
    },	
	title_is: {
        type: String,
        default: null
    },
	title_it: {
        type: String,
        default: null
    },
	title_iw: {
        type: String,
        default: null
    },
	title_ja: {
        type: String,
        default: null
    },
	title_jw: {
        type: String,
        default: null
    },
	title_ka: {
        type: String,
        default: null
    },
	title_kk: {
        type: String,
        default: null
    },
	title_km: {
        type: String,
        default: null
    },
	title_kn: {
        type: String,
        default: null
    },
	title_ko: {
        type: String,
        default: null
    },
	title_ku: {
        type: String,
        default: null
    },
	title_ky: {
        type: String,
        default: null
    },
	title_la: {
        type: String,
        default: null
    },
	title_lb: {
        type: String,
        default: null
    },
	title_lo: {
        type: String,
        default: null
    },
	title_lt: {
        type: String,
        default: null
    },
	title_lv: {
        type: String,
        default: null
    },
	title_mg: {
        type: String,
        default: null
    },
	title_mi: {
        type: String,
        default: null
    },
	title_mk: {
        type: String,
        default: null
    },
	title_ml: {
        type: String,
        default: null
    },
	title_mn: {
        type: String,
        default: null
    },
	title_mr: {
        type: String,
        default: null
    },
	title_ms: {
        type: String,
        default: null
    },
	title_mt: {
        type: String,
        default: null
    },
	title_my: {
        type: String,
        default: null
    },
	title_ne: {
        type: String,
        default: null
    },
	title_nl: {
        type: String,
        default: null
    },
	title_no: {
        type: String,
        default: null
    },
	title_ny: {
        type: String,
        default: null
    },
	title_pa: {
        type: String,
        default: null
    },
	title_pl: {
        type: String,
        default: null
    },
	title_ps: {
        type: String,
        default: null
    },
	title_pt: {
        type: String,
        default: null
    },
	title_ro: {
        type: String,
        default: null
    },

	title_ru: {
        type: String,
        default: null
    },

	title_sd: {
        type: String,
        default: null
    },

	title_si: {
        type: String,
        default: null
    },

	title_sk: {
        type: String,
        default: null
    },

	title_sl: {
        type: String,
        default: null
    },

	title_sm: {
        type: String,
        default: null
    },

	title_sn: {
        type: String,
        default: null
    },

	title_so: {
        type: String,
        default: null
    },

	title_sq: {
        type: String,
        default: null
    },

	title_sr: {
        type: String,
        default: null
    },

	title_st: {
        type: String,
        default: null
    },

	title_su: {
        type: String,
        default: null
    },

	title_sv: {
        type: String,
        default: null
    },

	title_sw: {
        type: String,
        default: null
    },

	title_ta: {
        type: String,
        default: null
    },

	title_te: {
        type: String,
        default: null
    },

	title_tg: {
        type: String,
        default: null
    },

	title_th: {
        type: String,
        default: null
    },

	title_tl: {
        type: String,
        default: null
    },

	title_tr: {
        type: String,
        default: null
    },

	title_uk: {
        type: String,
        default: null
    },

	title_ur: {
        type: String,
        default: null
    },

	title_uz: {
        type: String,
        default: null
    },

	title_vi: {
        type: String,
        default: null
    },

	title_xh: {
        type: String,
        default: null
    },

	title_yi: {
        type: String,
        default: null
    },

	title_yo: {
        type: String,
        default: null
    },

	title_zh: {
        type: String,
        default: null
    },

	title_zu: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
	description_af: {
        type: String,
        default: null
    },

	description_am: {
        type: String,
        default: null
    },

	description_ar: {
        type: String,
        default: null
    },

	description_az: {
        type: String,
        default: null
    },

	description_be: {
        type: String,
        default: null
    },

	description_bg: {
        type: String,
        default: null
    },

	description_bn: {
        type: String,
        default: null
    },

	description_bs: {
        type: String,
        default: null
    },

	description_ca: {
        type: String,
        default: null
    },

	description_ceb: {
        type: String,
        default: null
    },

	description_co: {
        type: String,
        default: null
    },

	description_cs: {
        type: String,
        default: null
    },

	description_cy: {
        type: String,
        default: null
    },

	description_da: {
        type: String,
        default: null
    },

	description_de: {
        type: String,
        default: null
    },

	description_el: {
        type: String,
        default: null
    },

	description_en: {
        type: String,
        default: null
    },

	description_eo: {
        type: String,
        default: null
    },

	description_es: {
        type: String,
        default: null
    },

	description_et: {
        type: String,
        default: null
    },

	description_eu: {
        type: String,
        default: null
    },

	description_fa: {
        type: String,
        default: null
    },

	description_fi: {
        type: String,
        default: null
    },

	description_fr: {
        type: String,
        default: null
    },

	description_fy: {
        type: String,
        default: null
    },

	description_ga: {
        type: String,
        default: null
    },

	description_gd: {
        type: String,
        default: null
    },

	description_gl: {
        type: String,
        default: null
    },

	description_gu: {
        type: String,
        default: null
    },

	description_ha: {
        type: String,
        default: null
    },

	description_haw: {
        type: String,
        default: null
    },

	description_hi: {
        type: String,
        default: null
    },

	description_hmn: {
        type: String,
        default: null
    },

	description_hr: {
        type: String,
        default: null
    },

	description_ht: {
        type: String,
        default: null
    },

	description_hu: {
        type: String,
        default: null
    },

	description_hy: {
        type: String,
        default: null
    },

	description_id: {
        type: String,
        default: null
    },

	description_ig: {
        type: String,
        default: null
    },

	description_is: {
        type: String,
        default: null
    },

	description_it: {
        type: String,
        default: null
    },

	description_iw: {
        type: String,
        default: null
    },

	description_ja: {
        type: String,
        default: null
    },

	description_jw: {
        type: String,
        default: null
    },

	description_ka: {
        type: String,
        default: null
    },

	description_kk: {
        type: String,
        default: null
    },

	description_km: {
        type: String,
        default: null
    },

	description_kn: {
        type: String,
        default: null
    },

	description_ko: {
        type: String,
        default: null
    },

	description_ku: {
        type: String,
        default: null
    },

	description_ky: {
        type: String,
        default: null
    },

	description_la: {
        type: String,
        default: null
    },

	description_lb: {
        type: String,
        default: null
    },

	description_lo: {
        type: String,
        default: null
    },

	description_lt: {
        type: String,
        default: null
    },

	description_lv: {
        type: String,
        default: null
    },

	description_mg: {
        type: String,
        default: null
    },

	description_mi: {
        type: String,
        default: null
    },

	description_mk: {
        type: String,
        default: null
    },

	description_ml: {
        type: String,
        default: null
    },

	description_mn: {
        type: String,
        default: null
    },

	description_mr: {
        type: String,
        default: null
    },

	description_ms: {
        type: String,
        default: null
    },

	description_mt: {
        type: String,
        default: null
    },

	description_my: {
        type: String,
        default: null
    },

	description_ne: {
        type: String,
        default: null
    },

	description_nl: {
        type: String,
        default: null
    },

	description_no: {
        type: String,
        default: null
    },

	description_ny: {
        type: String,
        default: null
    },

	description_pa: {
        type: String,
        default: null
    },

	description_pl: {
        type: String,
        default: null
    },

	description_ps: {
        type: String,
        default: null
    },

	description_pt: {
        type: String,
        default: null
    },

	description_ro: {
        type: String,
        default: null
    },

	description_ru: {
        type: String,
        default: null
    },

	description_sd: {
        type: String,
        default: null
    },

	description_si: {
        type: String,
        default: null
    },

	description_sk: {
        type: String,
        default: null
    },

	description_sl: {
        type: String,
        default: null
    },

	description_sm: {
        type: String,
        default: null
    },

	description_sn: {
        type: String,
        default: null
    },

	description_so: {
        type: String,
        default: null
    },

	description_sq: {
        type: String,
        default: null
    },

	description_sr: {
        type: String,
        default: null
    },

	description_st: {
        type: String,
        default: null
    },

	description_su: {
        type: String,
        default: null
    },

	description_sv: {
        type: String,
        default: null
    },

	description_sw: {
        type: String,
        default: null
    },

	description_ta: {
        type: String,
        default: null
    },

	description_te: {
        type: String,
        default: null
    },

	description_tg: {
        type: String,
        default: null
    },

	description_th: {
        type: String,
        default: null
    },

	description_tl: {
        type: String,
        default: null
    },

	description_tr: {
        type: String,
        default: null
    },

	description_uk: {
        type: String,
        default: null
    },

	description_ur: {
        type: String,
        default: null
    },

	description_uz: {
        type: String,
        default: null
    },

	description_vi: {
        type: String,
        default: null
    },

	description_xh: {
        type: String,
        default: null
    },

	description_yi: {
        type: String,
        default: null
    },

	description_yo: {
        type: String,
        default: null
    },

	description_zh: {
        type: String,
        default: null
    },

	description_zu: {
        type: String,
        default: null
    },
    comment: {
        type: String,
        default: null,
        //required: [true, 'Comment is required']
    },
	comment_af: {
        type: String,
        default: null
    },

	comment_am: {
        type: String,
        default: null
    },

	comment_ar: {
        type: String,
        default: null
    },

	comment_az: {
        type: String,
        default: null
    },

	comment_be: {
        type: String,
        default: null
    },

	comment_bg: {
        type: String,
        default: null
    },

	comment_bn: {
        type: String,
        default: null
    },

	comment_bs: {
        type: String,
        default: null
    },

	comment_ca: {
        type: String,
        default: null
    },

	comment_ceb: {
        type: String,
        default: null
    },

	comment_co: {
        type: String,
        default: null
    },

	comment_cs: {
        type: String,
        default: null
    },

	comment_cy: {
        type: String,
        default: null
    },

	comment_da: {
        type: String,
        default: null
    },

	comment_de: {
        type: String,
        default: null
    },

	comment_el: {
        type: String,
        default: null
    },

	comment_en: {
        type: String,
        default: null
    },

	comment_eo: {
        type: String,
        default: null
    },

	comment_es: {
        type: String,
        default: null
    },

	comment_et: {
        type: String,
        default: null
    },

	comment_eu: {
        type: String,
        default: null
    },

	comment_fa: {
        type: String,
        default: null
    },

	comment_fi: {
        type: String,
        default: null
    },

	comment_fr: {
        type: String,
        default: null
    },

	comment_fy: {
        type: String,
        default: null
    },

	comment_ga: {
        type: String,
        default: null
    },

	comment_gd: {
        type: String,
        default: null
    },

	comment_gl: {
        type: String,
        default: null
    },

	comment_gu: {
        type: String,
        default: null
    },

	comment_ha: {
        type: String,
        default: null
    },

	comment_haw: {
        type: String,
        default: null
    },

	comment_hi: {
        type: String,
        default: null
    },

	comment_hmn: {
        type: String,
        default: null
    },

	comment_hr: {
        type: String,
        default: null
    },

	comment_ht: {
        type: String,
        default: null
    },

	comment_hu: {
        type: String,
        default: null
    },

	comment_hy: {
        type: String,
        default: null
    },

	comment_id: {
        type: String,
        default: null
    },

	comment_ig: {
        type: String,
        default: null
    },

	comment_is: {
        type: String,
        default: null
    },

	comment_it: {
        type: String,
        default: null
    },

	comment_iw: {
        type: String,
        default: null
    },

	comment_ja: {
        type: String,
        default: null
    },

	comment_jw: {
        type: String,
        default: null
    },

	comment_ka: {
        type: String,
        default: null
    },

	comment_kk: {
        type: String,
        default: null
    },

	comment_km: {
        type: String,
        default: null
    },

	comment_kn: {
        type: String,
        default: null
    },

	comment_ko: {
        type: String,
        default: null
    },

	comment_ku: {
        type: String,
        default: null
    },

	comment_ky: {
        type: String,
        default: null
    },

	comment_la: {
        type: String,
        default: null
    },

	comment_lb: {
        type: String,
        default: null
    },

	comment_lo: {
        type: String,
        default: null
    },

	comment_lt: {
        type: String,
        default: null
    },

	comment_lv: {
        type: String,
        default: null
    },

	comment_mg: {
        type: String,
        default: null
    },

	comment_mi: {
        type: String,
        default: null
    },

	comment_mk: {
        type: String,
        default: null
    },

	comment_ml: {
        type: String,
        default: null
    },

	comment_mn: {
        type: String,
        default: null
    },

	comment_mr: {
        type: String,
        default: null
    },

	comment_ms: {
        type: String,
        default: null
    },

	comment_mt: {
        type: String,
        default: null
    },

	comment_my: {
        type: String,
        default: null
    },

	comment_ne: {
        type: String,
        default: null
    },

	comment_nl: {
        type: String,
        default: null
    },

	comment_no: {
        type: String,
        default: null
    },

	comment_ny: {
        type: String,
        default: null
    },

	comment_pa: {
        type: String,
        default: null
    },

	comment_pl: {
        type: String,
        default: null
    },

	comment_ps: {
        type: String,
        default: null
    },

	comment_pt: {
        type: String,
        default: null
    },

	comment_ro: {
        type: String,
        default: null
    },

	comment_ru: {
        type: String,
        default: null
    },

	comment_sd: {
        type: String,
        default: null
    },

	comment_si: {
        type: String,
        default: null
    },

	comment_sk: {
        type: String,
        default: null
    },

	comment_sl: {
        type: String,
        default: null
    },

	comment_sm: {
        type: String,
        default: null
    },

	comment_sn: {
        type: String,
        default: null
    },

	comment_so: {
        type: String,
        default: null
    },

	comment_sq: {
        type: String,
        default: null
    },

	comment_sr: {
        type: String,
        default: null
    },

	comment_st: {
        type: String,
        default: null
    },

	comment_su: {
        type: String,
        default: null
    },

	comment_sv: {
        type: String,
        default: null
    },

	comment_sw: {
        type: String,
        default: null
    },

	comment_ta: {
        type: String,
        default: null
    },

	comment_te: {
        type: String,
        default: null
    },

	comment_tg: {
        type: String,
        default: null
    },

	comment_th: {
        type: String,
        default: null
    },

	comment_tl: {
        type: String,
        default: null
    },

	comment_tr: {
        type: String,
        default: null
    },

	comment_uk: {
        type: String,
        default: null
    },

	comment_ur: {
        type: String,
        default: null
    },

	comment_uz: {
        type: String,
        default: null
    },

	comment_vi: {
        type: String,
        default: null
    },

	comment_xh: {
        type: String,
        default: null
    },

	comment_yi: {
        type: String,
        default: null
    },

	comment_yo: {
        type: String,
        default: null
    },

	comment_zh: {
        type: String,
        default: null
    },

	comment_zu: {
        type: String,
        default: null
    },
    files: {
        type: Array,
        default: []
    },
    site_name: {
        type: String,
        default: null
    },
    author: {
        type: Object,
        default: {}
    },
    views: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: null
    },
    topic: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
	lang: {
        type: String,
        default: null
    },
	is_files: {
        type: String,
        default: null
    },
	is_files_af: {
        type: String,
        default: null
    },

	is_files_am: {
        type: String,
        default: null
    },

	is_files_ar: {
        type: String,
        default: null
    },

	is_files_az: {
        type: String,
        default: null
    },

	is_files_be: {
        type: String,
        default: null
    },

	is_files_bg: {
        type: String,
        default: null
    },

	is_files_bn: {
        type: String,
        default: null
    },

	is_files_bs: {
        type: String,
        default: null
    },

	is_files_ca: {
        type: String,
        default: null
    },

	is_files_ceb: {
        type: String,
        default: null
    },

	is_files_co: {
        type: String,
        default: null
    },

	is_files_cs: {
        type: String,
        default: null
    },

	is_files_cy: {
        type: String,
        default: null
    },

	is_files_da: {
        type: String,
        default: null
    },

	is_files_de: {
        type: String,
        default: null
    },

	is_files_el: {
        type: String,
        default: null
    },

	is_files_en: {
        type: String,
        default: null
    },

	is_files_eo: {
        type: String,
        default: null
    },

	is_files_es: {
        type: String,
        default: null
    },

	is_files_et: {
        type: String,
        default: null
    },

	is_files_eu: {
        type: String,
        default: null
    },

	is_files_fa: {
        type: String,
        default: null
    },

	is_files_fi: {
        type: String,
        default: null
    },

	is_files_fr: {
        type: String,
        default: null
    },

	is_files_fy: {
        type: String,
        default: null
    },

	is_files_ga: {
        type: String,
        default: null
    },

	is_files_gd: {
        type: String,
        default: null
    },

	is_files_gl: {
        type: String,
        default: null
    },

	is_files_gu: {
        type: String,
        default: null
    },

	is_files_ha: {
        type: String,
        default: null
    },

	is_files_haw: {
        type: String,
        default: null
    },

	is_files_hi: {
        type: String,
        default: null
    },

	is_files_hmn: {
        type: String,
        default: null
    },

	is_files_hr: {
        type: String,
        default: null
    },

	is_files_ht: {
        type: String,
        default: null
    },

	is_files_hu: {
        type: String,
        default: null
    },

	is_files_hy: {
        type: String,
        default: null
    },

	is_files_id: {
        type: String,
        default: null
    },

	is_files_ig: {
        type: String,
        default: null
    },

	is_files_is: {
        type: String,
        default: null
    },

	is_files_it: {
        type: String,
        default: null
    },

	is_files_iw: {
        type: String,
        default: null
    },

	is_files_ja: {
        type: String,
        default: null
    },

	is_files_jw: {
        type: String,
        default: null
    },

	is_files_ka: {
        type: String,
        default: null
    },

	is_files_kk: {
        type: String,
        default: null
    },

	is_files_km: {
        type: String,
        default: null
    },

	is_files_kn: {
        type: String,
        default: null
    },

	is_files_ko: {
        type: String,
        default: null
    },

	is_files_ku: {
        type: String,
        default: null
    },

	is_files_ky: {
        type: String,
        default: null
    },

	is_files_la: {
        type: String,
        default: null
    },

	is_files_lb: {
        type: String,
        default: null
    },

	is_files_lo: {
        type: String,
        default: null
    },

	is_files_lt: {
        type: String,
        default: null
    },

	is_files_lv: {
        type: String,
        default: null
    },

	is_files_mg: {
        type: String,
        default: null
    },

	is_files_mi: {
        type: String,
        default: null
    },

	is_files_mk: {
        type: String,
        default: null
    },

	is_files_ml: {
        type: String,
        default: null
    },

	is_files_mn: {
        type: String,
        default: null
    },

	is_files_mr: {
        type: String,
        default: null
    },

	is_files_ms: {
        type: String,
        default: null
    },

	is_files_mt: {
        type: String,
        default: null
    },

	is_files_my: {
        type: String,
        default: null
    },

	is_files_ne: {
        type: String,
        default: null
    },

	is_files_nl: {
        type: String,
        default: null
    },

	is_files_no: {
        type: String,
        default: null
    },

	is_files_ny: {
        type: String,
        default: null
    },

	is_files_pa: {
        type: String,
        default: null
    },

	is_files_pl: {
        type: String,
        default: null
    },

	is_files_ps: {
        type: String,
        default: null
    },

	is_files_pt: {
        type: String,
        default: null
    },

	is_files_ro: {
        type: String,
        default: null
    },

	is_files_ru: {
        type: String,
        default: null
    },

	is_files_sd: {
        type: String,
        default: null
    },

	is_files_si: {
        type: String,
        default: null
    },

	is_files_sk: {
        type: String,
        default: null
    },

	is_files_sl: {
        type: String,
        default: null
    },

	is_files_sm: {
        type: String,
        default: null
    },

	is_files_sn: {
        type: String,
        default: null
    },

	is_files_so: {
        type: String,
        default: null
    },

	is_files_sq: {
        type: String,
        default: null
    },

	is_files_sr: {
        type: String,
        default: null
    },

	is_files_st: {
        type: String,
        default: null
    },

	is_files_su: {
        type: String,
        default: null
    },

	is_files_sv: {
        type: String,
        default: null
    },

	is_files_sw: {
        type: String,
        default: null
    },

	is_files_ta: {
        type: String,
        default: null
    },

	is_files_te: {
        type: String,
        default: null
    },

	is_files_tg: {
        type: String,
        default: null
    },

	is_files_th: {
        type: String,
        default: null
    },

	is_files_tl: {
        type: String,
        default: null
    },

	is_files_tr: {
        type: String,
        default: null
    },

	is_files_uk: {
        type: String,
        default: null
    },

	is_files_ur: {
        type: String,
        default: null
    },

	is_files_uz: {
        type: String,
        default: null
    },

	is_files_vi: {
        type: String,
        default: null
    },

	is_files_xh: {
        type: String,
        default: null
    },

	is_files_yi: {
        type: String,
        default: null
    },

	is_files_yo: {
        type: String,
        default: null
    },

	is_files_zh: {
        type: String,
        default: null
    },

	is_files_zu: {
        type: String,
        default: null
    },

    date: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}

const options = {
    setDefaultsOnInsert: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

const messageSchema = new mongoose.Schema(definition, options)

// messageSchema.virtual('is_favourite').get(function () {
//     return false
// })

messageSchema.post('find', function (messages, next) {
    messages.forEach((message) => {
        if (message) {
            message.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
        }
    })
    next()
})

messageSchema.post('findOne', function (message, next) {
    if (message) {
        message.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
    }
    next()
});

messageSchema.post('init', function (message, next) {
    if (message) {
        message.files.sort((a, b) => (a.type > b.type) ? 1 : ((a.type > b.type) ? -1 : 0))
    }
    next()
});

module.exports = mongoose.model('Message', messageSchema)