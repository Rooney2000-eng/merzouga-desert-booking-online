import type { AddOn, FaqItem, Service, Testimonial } from "@/lib/types";

export const siteStats = [
  { label: "سعر البداية", value: "300 MAD" },
  { label: "تأكيد الحجز", value: "WhatsApp" },
  { label: "نوع الرحلات", value: "خاص / مجموعات" },
  { label: "الموقع", value: "Merzouga" }
] as const;

export const services: Service[] = [
  {
    id: "camel",
    eyebrow: "الأصالة الصحراوية",
    title: "رحلة الجمال وقت الغروب",
    description:
      "جولة هادئة فوق الكثبان الرملية مع وقت مخصص للصور ولحظة غروب ساحرة في صحراء مرزوكة.",
    duration: "حوالي 1 ساعة",
    badge: "الأكثر طلبا",
    price: 300,
    pricingModel: "perPerson",
    unitLabel: "درهم / شخص",
    features: ["مرشد محلي", "توقفات للتصوير", "مناسب للأزواج والعائلات"]
  },
  {
    id: "camp",
    eyebrow: "ليلة لا تنسى",
    title: "خيمة صحراوية مع عشاء وفطور",
    description:
      "مبيت داخل خيمة صحراوية مريحة يشمل العشاء المغربي، جلسة نار، موسيقى محلية، وفطور صباحي وسط الكثبان.",
    duration: "ليلة كاملة",
    badge: "الأكثر تميزا",
    price: 850,
    pricingModel: "perNight",
    unitLabel: "درهم / شخص / ليلة",
    features: ["عشاء + فطور", "جلسة نار", "خيارات خاصة للأزواج"]
  },
  {
    id: "quad",
    eyebrow: "مغامرة سريعة",
    title: "جولة كواد بين الكثبان",
    description:
      "قيادة ممتعة وآمنة بدراجات رباعية مع مسار صحراوي مناسب للمبتدئين ومحبي المغامرة.",
    duration: "1 ساعة",
    badge: "أدرينالين",
    price: 600,
    pricingModel: "perHour",
    unitLabel: "درهم / كواد / ساعة",
    features: ["معدات سلامة", "شرح قبل الانطلاق", "مسارات مرنة"]
  },
  {
    id: "combo",
    eyebrow: "أفضل عرض",
    title: "باقة Sahra Joy الكاملة",
    description:
      "رحلة جمال عند الغروب + مبيت في الخيمة + عشاء وفطور + تجربة صحراوية متكاملة في عرض واحد.",
    duration: "غروب + ليلة",
    badge: "أفضل قيمة",
    price: 1350,
    pricingModel: "perPerson",
    unitLabel: "درهم / شخص",
    features: ["أفضل سعر", "تجربة كاملة", "مثالي للمسافرين لأول مرة"]
  }
];

export const addOns: AddOn[] = [
  {
    id: "transfer",
    title: "نقل خاص من/إلى مرزوكة أو أرفود",
    description: "سيارة خاصة مريحة لتسهيل الوصول إلى نقطة الانطلاق أو المخيم.",
    price: 400,
    pricing: "group"
  },
  {
    id: "sandboarding",
    title: "ساندبورد على الكثبان",
    description: "أضف متعة التزلج على الرمال إلى رحلتك الصحراوية.",
    price: 120,
    pricing: "perPerson"
  },
  {
    id: "photographer",
    title: "جلسة تصوير قصيرة",
    description: "لقطات احترافية للغروب أو أجواء المخيم تناسب الأزواج والعائلات.",
    price: 450,
    pricing: "group"
  },
  {
    id: "privateGuide",
    title: "تنسيق وتجربة خاصة",
    description: "تنظيم أكثر خصوصية مع متابعة مباشرة للحجز وتجربة مخصصة لك.",
    price: 180,
    pricing: "perPerson"
  }
];

export const highlights = [
  {
    title: "تجارب حقيقية في قلب مرزوكة",
    description:
      "نوفر رحلات مبنية على أكثر الأنشطة طلبا في الصحراء: الجمال، المخيمات، والكواد، مع تنظيم سهل وواضح."
  },
  {
    title: "تأكيد سريع عبر واتساب",
    description:
      "بعد اختيار العرض وإرسال الطلب، تكمل التأكيد مباشرة عبر واتساب لتسريع التواصل وترتيب التفاصيل."
  },
  {
    title: "أسعار واضحة وبسيطة",
    description:
      "الأسعار المعروضة داخل الموقع بداية من أسعار واقعية تساعد الزائر على فهم الميزانية قبل التواصل."
  },
  {
    title: "مناسب للهواتف والسياح الدوليين",
    description:
      "الموقع متجاوب وسريع، ويسهّل على الزائر من الهاتف تصفح العروض والتواصل الفوري بدون تعقيد."
  }
] as const;

export const processSteps = [
  {
    step: "01",
    title: "اختر العرض المناسب",
    description: "اختر بين رحلة الجمال، الخيمة الصحراوية، الكواد، أو الباقة الكاملة."
  },
  {
    step: "02",
    title: "حدد التاريخ والعدد",
    description: "اختر تاريخ الرحلة، عدد الأشخاص أو الكوادات، ثم أضف الإضافات التي تريدها."
  },
  {
    step: "03",
    title: "أكمل التأكيد عبر واتساب",
    description: "بعد إرسال الطلب يظهر لك زر واتساب جاهز برسالة مفصلة لتأكيد الحجز بسرعة."
  }
] as const;

export const trustPillars = [
  "مرشدون محليون",
  "عروض واضحة",
  "حجز سريع",
  "رد مباشر عبر واتساب",
  "رحلات خاصة أو مجموعات",
  "مناسب للجوال"
] as const;

export const testimonials: Testimonial[] = [
  {
    name: "Clara M.",
    country: "Spain",
    quote:
      "The booking steps were simple and the WhatsApp confirmation was very fast. Our sunset camel ride in Merzouga was beautiful.",
    rating: 5,
    trip: "Camel Sunset"
  },
  {
    name: "Yassine B.",
    country: "Morocco",
    quote:
      "أعجبني وضوح العروض والأسعار داخل الموقع. تواصلت بسرعة وتم تنظيم ليلة المخيم بشكل ممتاز.",
    rating: 5,
    trip: "Desert Camp"
  },
  {
    name: "Lucas & Emma",
    country: "France",
    quote:
      "We booked the combo offer and it was the best choice for our first trip to Merzouga. Easy, clear and memorable.",
    rating: 5,
    trip: "Full Package"
  }
];

export const faqs: FaqItem[] = [
  {
    question: "كيف أؤكد الحجز؟",
    answer:
      "بعد ملء نموذج الحجز سيظهر لك زر واتساب برسالة جاهزة، ومن خلاله يتم تأكيد التفاصيل بسرعة مع فريق Sahra Joy."
  },
  {
    question: "هل الأسعار المعروضة نهائية؟",
    answer:
      "الأسعار المعروضة هي أسعار بداية من عروض منطقية وواضحة. السعر النهائي يتأكد حسب التاريخ والعدد والإضافات المطلوبة."
  },
  {
    question: "هل أستطيع طلب نقل أو تجربة خاصة؟",
    answer:
      "نعم، يمكنك اختيار النقل الخاص أو طلب تنسيق أكثر خصوصية من داخل الإضافات أو كتابته في الملاحظات."
  },
  {
    question: "هل يوجد دفع إلكتروني الآن؟",
    answer:
      "يتم حاليا تأكيد الحجوزات بسرعة عبر واتساب بعد إرسال الطلب، ويمكن تزويدك بتفاصيل الأداء المناسبة عند التواصل."
  }
];
