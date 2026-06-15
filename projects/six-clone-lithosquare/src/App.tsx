import { useEffect, useRef, useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './vendor/SplitText.js';
import Lenis from 'lenis';
import './global.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const shapeRects = [
	{ x: 150, y: 330, w: 30, h: 30 },
	{ x: 150, y: 300, w: 30, h: 30 },
	{ x: 180, y: 300, w: 30, h: 30 },
	{ x: 210, y: 300, w: 30, h: 30 },
	{ x: 210, y: 270, w: 30, h: 30 },
	{ x: 240, y: 270, w: 30, h: 30 },
	{ x: 240, y: 240, w: 30, h: 30 },
	{ x: 240, y: 210, w: 30, h: 30 },
	{ x: 240, y: 180, w: 30, h: 30 },
	{ x: 240, y: 150, w: 30, h: 30 },
	{ x: 240, y: 120, w: 30, h: 30 },
	{ x: 270, y: 270, w: 30, h: 30 },
	{ x: 270, y: 240, w: 30, h: 30 },
	{ x: 270, y: 210, w: 30, h: 30 },
	{ x: 270, y: 180, w: 30, h: 30 },
	{ x: 270, y: 150, w: 30, h: 30 },
	{ x: 270, y: 120, w: 30, h: 30 },
	{ x: 300, y: 270, w: 30, h: 30 },
	{ x: 300, y: 240, w: 30, h: 30 },
	{ x: 300, y: 210, w: 30, h: 30 },
	{ x: 300, y: 180, w: 30, h: 30 },
	{ x: 300, y: 150, w: 30, h: 30 },
	{ x: 300, y: 120, w: 30, h: 30 },
	{ x: 300, y: 90, w: 30, h: 30 },
	{ x: 330, y: 270, w: 30, h: 30 },
	{ x: 330, y: 240, w: 30, h: 30 },
	{ x: 330, y: 210, w: 30, h: 30 },
	{ x: 330, y: 180, w: 30, h: 30 },
	{ x: 330, y: 150, w: 30, h: 30 },
	{ x: 330, y: 120, w: 30, h: 30 },
	{ x: 360, y: 270, w: 30, h: 30 },
	{ x: 360, y: 300, w: 30, h: 30 },
	{ x: 360, y: 240, w: 30, h: 30 },
	{ x: 360, y: 210, w: 30, h: 30 },
	{ x: 390, y: 210, w: 30, h: 30 },
	{ x: 360, y: 180, w: 30, h: 30 },
	{ x: 390, y: 180, w: 30, h: 30 },
	{ x: 420, y: 180, w: 30, h: 30 },
	{ x: 360, y: 150, w: 30, h: 30 },
	{ x: 390, y: 150, w: 30, h: 30 },
	{ x: 420, y: 150, w: 30, h: 30 },
	{ x: 360, y: 120, w: 30, h: 30 },
	{ x: 360, y: 90, w: 30, h: 30 },
	{ x: 360, y: 60, w: 30, h: 30 },
	{ x: 390, y: 120, w: 30, h: 30 },
	{ x: 390, y: 90, w: 30, h: 30 },
	{ x: 420, y: 120, w: 30, h: 30 },
	{ x: 210, y: 240, w: 30, h: 30 },
	{ x: 210, y: 210, w: 30, h: 30 },
	{ x: 210, y: 180, w: 30, h: 30 },
	{ x: 210, y: 150, w: 30, h: 30 },
	{ x: 210, y: 120, w: 30, h: 30 },
	{ x: 210, y: 90, w: 30, h: 30 },
	{ x: 180, y: 90, w: 30, h: 30 },
	{ x: 210, y: 60, w: 30, h: 30 },
	{ x: 240, y: 60, w: 30, h: 30 },
	{ x: 270, y: 60, w: 30, h: 30 },
	{ x: 270, y: 90, w: 30, h: 30 },
	{ x: 240, y: 90, w: 30, h: 30 },
	{ x: 240, y: 30, w: 30, h: 30 },
	{ x: 180, y: 60, w: 30, h: 30 },
	{ x: 180, y: 30, w: 30, h: 30 },
	{ x: 180, y: 0, w: 30, h: 30 },
	{ x: 120, y: 300, w: 30, h: 30 },
	{ x: 150, y: 270, w: 30, h: 30 },
	{ x: 180, y: 270, w: 30, h: 30 },
	{ x: 120, y: 270, w: 30, h: 30 },
	{ x: 90, y: 270, w: 30, h: 30 },
	{ x: 150, y: 240, w: 30, h: 30 },
	{ x: 180, y: 240, w: 30, h: 30 },
	{ x: 120, y: 240, w: 30, h: 30 },
	{ x: 90, y: 240, w: 30, h: 30 },
	{ x: 60, y: 240, w: 30, h: 30 },
	{ x: 150, y: 210, w: 30, h: 30 },
	{ x: 180, y: 210, w: 30, h: 30 },
	{ x: 120, y: 210, w: 30, h: 30 },
	{ x: 90, y: 210, w: 30, h: 30 },
	{ x: 60, y: 210, w: 30, h: 30 },
	{ x: 30, y: 210, w: 30, h: 30 },
	{ x: 0, y: 210, w: 30, h: 30 },
	{ x: 150, y: 180, w: 30, h: 30 },
	{ x: 180, y: 180, w: 30, h: 30 },
	{ x: 120, y: 180, w: 30, h: 30 },
	{ x: 90, y: 180, w: 30, h: 30 },
	{ x: 60, y: 180, w: 30, h: 30 },
	{ x: 30, y: 180, w: 30, h: 30 },
	{ x: 0, y: 180, w: 30, h: 30 },
	{ x: 150, y: 150, w: 30, h: 30 },
	{ x: 180, y: 150, w: 30, h: 30 },
	{ x: 120, y: 150, w: 30, h: 30 },
	{ x: 90, y: 150, w: 30, h: 30 },
	{ x: 60, y: 150, w: 30, h: 30 },
	{ x: 30, y: 150, w: 30, h: 30 },
	{ x: 30, y: 120, w: 30, h: 30 },
	{ x: 30, y: 90, w: 30, h: 30 },
	{ x: 0, y: 150, w: 30, h: 30 },
	{ x: 150, y: 120, w: 30, h: 30 },
	{ x: 180, y: 120, w: 30, h: 30 },
	{ x: 120, y: 120, w: 30, h: 30 },
	{ x: 90, y: 120, w: 30, h: 30 },
	{ x: 60, y: 120, w: 30, h: 30 },
	{ x: 150, y: 90, w: 30, h: 30 },
	{ x: 120, y: 90, w: 30, h: 30 },
	{ x: 90, y: 90, w: 30, h: 30 },
	{ x: 60, y: 90, w: 30, h: 30 },
	{ x: 150, y: 60, w: 30, h: 30 },
	{ x: 120, y: 60, w: 30, h: 30 },
	{ x: 90, y: 60, w: 30, h: 30 },
	{ x: 60, y: 60, w: 30, h: 30 },
	{ x: 150, y: 30, w: 30, h: 30 },
];

const features = [
	{
		number: '01',
		title: 'Building a reliable future',
		body: 'Critical minerals are essential to our collective future, but supply won’t meet demand. We need to enter a new era of exploration. We drive the shift with technologies and methods built for the field.',
		catchphraseClass: 'catchphrase_i1',
	},
	{
		number: '02',
		title: 'Next-gen mineral exploration',
		body: 'Lithosquare radically speeds up mineral exploration by combining foundational AI, geological expertise, and real-world data — to reduce uncertainty, prioritize the right targets, reduce costs and accelerate discovery.',
		catchphraseClass: 'catchphrase_i2',
	},
	{
		number: '03',
		title: 'A team built for excellence',
		body: 'We built an exceptional team of geologists, scientists, AI engineers, and data specialists. We work as one — from field sampling to model optimization — to push the boundaries of what’s possible.',
		catchphraseClass: 'catchphrase_i3',
	},
];

const newsItems = [
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		date: '05.06.2025',
		image:
			'https://cdn.prod.website-files.com/683fe9ed9abe575daebf241b/68416959317862f3216d0ee0_cover-3.webp',
	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		date: '05.06.2025',
		image:
			'https://cdn.prod.website-files.com/683fe9ed9abe575daebf241b/6840831e4407ec5d8d397480_cover-1.jpg',
	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		date: '04.06.2025',
		image:
			'https://cdn.prod.website-files.com/683fe9ed9abe575daebf241b/68416947bb075bf246532d73_cover-2.webp',
	},
];

function LogoWordmark() {
	return (
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 1165 172'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Lithosquare'
		>
			<path
				d='M49.57 49.57V4.66C49.57 2.09 47.48 0 44.91 0H4.66C2.09 0 0 2.09 0 4.66V49.57V94.98C0 97.55 2.09 99.64 4.66 99.64H34.28C42.85 99.64 49.79 106.58 49.79 115.15V144.1C49.79 146.67 51.88 148.76 54.45 148.76H143.85C146.42 148.76 148.51 146.67 148.51 144.1V103.85C148.51 101.28 146.42 99.19 143.85 99.19H65.08C56.51 99.19 49.57 92.25 49.57 83.68V49.57Z'
				fill='currentColor'
			/>
			<path
				d='M143.84 0H103.99C101.416 0 99.3301 2.08635 99.3301 4.66V44.91C99.3301 47.4836 101.416 49.57 103.99 49.57H143.84C146.414 49.57 148.5 47.4836 148.5 44.91V4.66C148.5 2.08635 146.414 0 143.84 0Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M230.949 136.719V18.3789H251.259V119.179H314.079V136.709H230.949V136.719Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M334.38 38.5478C331.26 38.5478 328.58 37.4478 326.35 35.2578C324.11 33.0678 322.99 30.3678 322.99 27.1478C322.99 23.9278 324.09 21.3578 326.28 19.1178C328.47 16.8778 331.17 15.7578 334.39 15.7578C337.61 15.7578 340.18 16.8578 342.42 19.0478C344.66 21.2378 345.78 23.9378 345.78 27.1578C345.78 30.3778 344.68 32.9578 342.49 35.1878C340.3 37.4278 337.6 38.5478 334.38 38.5478ZM324.45 136.718V49.0578H344.32V136.718H324.45Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M386.83 136.718C381.47 136.718 377.31 135.358 374.34 132.628C371.37 129.898 369.88 125.758 369.88 120.208V64.5478H354.1V49.0578H370.02V22.7578H389.6V49.0578H411.37V64.5478H389.75V121.088H413.56V136.718H386.83Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M423.49 136.72V14H443.36V62.5H443.94C446.76 57.53 450.64 53.78 455.56 51.25C460.48 48.72 466.3 47.45 473.02 47.45C484.03 47.45 492.77 50.74 499.24 57.31C505.72 63.88 508.96 72.67 508.96 83.68V136.71H489.09V87.18C489.09 79.97 487.17 74.47 483.32 70.67C479.47 66.87 473.8 64.97 466.3 64.97C458.8 64.97 453.1 66.87 449.21 70.67C445.31 74.47 443.37 79.97 443.37 87.18V136.71H423.5L423.49 136.72Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M566.669 138.466C557.419 138.466 549.359 136.596 542.489 132.846C535.619 129.096 530.289 123.816 526.489 116.996C522.689 110.176 520.789 102.146 520.789 92.8964C520.789 83.6464 522.659 75.6064 526.409 68.7864C530.159 61.9664 535.489 56.6864 542.409 52.9364C549.319 49.1864 557.459 47.3164 566.809 47.3164C576.159 47.3164 584.389 49.1664 591.209 52.8664C598.029 56.5664 603.289 61.8264 606.989 68.6464C610.689 75.4664 612.539 83.5464 612.539 92.8964C612.539 102.246 610.659 110.206 606.919 117.076C603.169 123.946 597.889 129.226 591.069 132.926C584.249 136.626 576.119 138.476 566.669 138.476V138.466ZM566.669 121.226C574.949 121.226 581.349 118.696 585.879 113.626C590.409 108.566 592.669 101.596 592.669 92.7364C592.669 83.8764 590.409 76.9564 585.879 71.9864C581.349 67.0164 574.949 64.5364 566.669 64.5364C558.389 64.5364 552.109 67.0464 547.529 72.0564C542.949 77.0764 540.659 83.9664 540.659 92.7264C540.659 101.486 542.949 108.556 547.529 113.616C552.109 118.686 558.489 121.216 566.669 121.216V121.226Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M661.039 138.466C648.569 138.466 638.739 135.866 631.529 130.646C624.319 125.436 620.379 118.156 619.699 108.806H639.129C639.809 113.576 641.999 117.136 645.699 119.476C649.399 121.816 654.759 122.986 661.769 122.986C673.849 122.986 679.889 119.386 679.889 112.176C679.889 109.256 678.959 106.966 677.109 105.306C675.259 103.646 672.189 102.436 667.909 101.656L648.479 98.0064C631.629 94.7964 623.209 86.8064 623.209 74.0464C623.209 65.8664 626.419 59.3664 632.849 54.5464C639.279 49.7264 648.089 47.3164 659.289 47.3164C670.489 47.3164 679.569 49.7964 686.239 54.7664C692.909 59.7364 696.639 66.6464 697.419 75.5164H678.279C677.209 71.0364 675.089 67.7264 671.919 65.5864C668.749 63.4464 664.199 62.3764 658.259 62.3764C652.999 62.3764 648.959 63.2564 646.129 65.0064C643.299 66.7564 641.889 69.2964 641.889 72.6064C641.889 75.0464 642.789 77.0164 644.589 78.5264C646.389 80.0364 649.239 81.1764 653.139 81.9564L672.719 85.7564C681.579 87.4164 688.059 90.2664 692.149 94.3064C696.239 98.3464 698.289 103.776 698.289 110.596C698.289 119.366 695.079 126.206 688.649 131.126C682.219 136.046 673.019 138.506 661.039 138.506V138.466Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M773.97 171.779V123.569H773.391C770.761 128.339 767.011 132.019 762.141 134.599C757.271 137.179 751.42 138.469 744.61 138.469C736.33 138.469 729.201 136.619 723.211 132.919C717.221 129.219 712.64 123.939 709.48 117.069C706.31 110.199 704.73 102.149 704.73 92.8886C704.73 83.6286 706.34 75.5986 709.55 68.7786C712.76 61.9586 717.49 56.6786 723.72 52.9286C729.95 49.1786 737.5 47.3086 746.36 47.3086C753.57 47.3086 759.731 48.6486 764.841 51.3286C769.951 54.0086 774.02 57.8786 777.04 62.9386H783.18V49.0586H803.781V69.0686H793.85V171.769H773.98L773.97 171.779ZM749.72 121.379C757.12 121.379 763.011 119.289 767.401 115.099C771.781 110.909 773.97 98.1486 773.97 98.1486V87.6286C773.97 80.5186 771.781 74.8686 767.401 70.6786C763.021 66.4886 757.12 64.3986 749.72 64.3986C741.63 64.3986 735.431 66.9286 731.091 71.9986C726.761 77.0686 724.591 84.0286 724.591 92.8886C724.591 101.749 726.761 108.719 731.091 113.779C735.421 118.849 741.63 121.379 749.72 121.379Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M852.421 138.329C840.731 138.329 831.651 135.169 825.171 128.829C818.691 122.499 815.461 113.879 815.461 102.969V49.0586H835.331V99.0186C835.331 106.229 837.181 111.659 840.881 115.309C844.581 118.959 850.081 120.789 857.391 120.789C864.701 120.789 870.711 118.839 874.851 114.949C878.991 111.059 881.061 105.599 881.061 98.5886V49.0586H900.931V116.699H911.011V136.709H890.411V122.829H884.271C880.961 127.899 876.721 131.739 871.561 134.369C866.401 136.999 860.021 138.309 852.421 138.309V138.329Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M950.149 138.328C940.119 138.328 932.199 135.848 926.409 130.878C920.609 125.908 917.719 119.388 917.719 111.298C917.719 103.208 920.639 96.2481 926.489 91.5781C932.329 86.8981 940.709 84.5681 951.619 84.5681H979.379V80.9181C979.379 69.2281 972.759 63.3881 959.509 63.3881C948.309 63.3881 941.589 67.4281 939.349 75.5181H919.479C921.139 66.4581 925.449 59.4981 932.409 54.6281C939.369 49.7581 948.459 47.3281 959.659 47.3281C972.219 47.3281 981.819 50.2281 988.439 56.0181C995.059 61.8181 998.369 70.2181 998.369 81.2181V116.718H1007.87V136.728H987.269V122.848H981.129C978.109 127.718 974.019 131.518 968.859 134.248C963.699 136.978 957.459 138.338 950.159 138.338L950.149 138.328ZM953.069 122.838C958.039 122.838 962.519 121.868 966.509 119.918C970.499 117.968 973.639 115.368 975.929 112.098C978.219 108.838 979.359 105.208 979.359 101.218V98.4381H952.629C941.909 98.4381 936.559 102.428 936.559 110.418C936.559 114.318 938.019 117.358 940.939 119.548C943.859 121.738 947.899 122.838 953.069 122.838Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M1023.49 136.717V69.0775H1013.41V49.0675H1034.16V65.8675H1040.3C1042.64 60.1175 1046.36 55.7375 1051.48 52.7175C1056.59 49.6975 1062.46 48.1875 1069.08 48.1875H1076.38V65.2775H1068.2C1059.92 65.2775 1053.66 67.6675 1049.43 72.4375C1045.19 77.2075 1043.07 83.5875 1043.07 91.5775V136.717H1023.49Z'
				fill='currentColor'
			/>
			<path
				className='logo-letter'
				d='M1122.69 138.469C1113.44 138.469 1105.38 136.599 1098.51 132.849C1091.64 129.099 1086.36 123.769 1082.66 116.849C1078.96 109.939 1077.11 101.849 1077.11 92.5986C1077.11 83.3486 1078.94 75.3386 1082.59 68.5686C1086.24 61.7986 1091.43 56.5686 1098.15 52.8586C1104.87 49.1586 1112.81 47.3086 1121.96 47.3086C1131.11 47.3086 1138.27 49.0386 1144.6 52.4986C1150.93 55.9586 1155.82 60.8786 1159.28 67.2586C1162.74 73.6386 1164.47 81.2086 1164.47 89.9786V97.2786H1096.1C1096.88 105.269 1099.56 111.429 1104.13 115.759C1108.71 120.099 1114.84 122.259 1122.54 122.259C1128.19 122.259 1132.81 121.189 1136.42 119.049C1140.02 116.909 1142.51 113.689 1143.87 109.409H1164.03C1161.89 118.569 1157.19 125.699 1149.93 130.809C1142.67 135.919 1133.59 138.479 1122.68 138.479L1122.69 138.469ZM1096.69 83.3986H1145.49C1144.71 76.9686 1142.28 72.0286 1138.18 68.5686C1134.09 65.1086 1128.68 63.3786 1121.96 63.3786C1115.24 63.3786 1109.69 65.1086 1105.31 68.5686C1100.93 72.0286 1098.05 76.9686 1096.69 83.3986Z'
				fill='currentColor'
			/>
		</svg>
	);
}

function ContactIcon() {
	return (
		<svg width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
			<path
				d='M3 19.0003V5.00026L5 3.00026H19L21 5.00026V19.0003L19 21.0003H5L3 19.0003Z'
				stroke='currentColor'
				strokeMiterlimit='10'
			/>
			<path d='M8 12.0003L12 8.00026L16 12.0003' stroke='currentColor' strokeMiterlimit='10' />
			<path d='M12 8.00026V17.0003' stroke='currentColor' strokeMiterlimit='10' />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg viewBox='0 0 24 24' width='100%' height='100%'>
			<path
				fill='currentColor'
				d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z'
			/>
		</svg>
	);
}

function SquareGrid() {
	const grid = useMemo(() => {
		const cells = [];
		for (let row = 0; row < 17; row++) {
			for (let col = 0; col < 30; col++) {
				cells.push({ row, col });
			}
		}
		return cells;
	}, []);

	return (
		<div className='square_grid'>
			{grid.map((cell: { row: number; col: number }, i: number) => (
				<div key={i} className='square' data-row={cell.row} data-col={cell.col} />
			))}
		</div>
	);
}

function SubheadSquares() {
	const grid = useMemo(() => {
		const cells = [];
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 14; col++) {
				cells.push({ row, col });
			}
		}
		return cells;
	}, []);

	return (
		<div className='subhead_grid'>
			{grid.map((_: any, i: number) => (
				<div key={i} className='subhead_square' />
			))}
		</div>
	);
}

function HeadingDivider() {
	return (
		<div className='divider-horizontal'>
			<div className='divider-horizontal_focus' />
		</div>
	);
}

function BrandIcon({ activeCount = 1 }: { activeCount?: number }) {
	return (
		<div className='square_icon'>
			<div className={`square_icon-square is-1 ${activeCount >= 1 ? 'is-active' : ''}`}>
				<svg viewBox='0 0 13 13' fill='none' width='100%' height='100%'>
					<path
						d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z'
						fill='currentColor'
					/>
				</svg>
			</div>
			<div className={`square_icon-square is-2 ${activeCount >= 2 ? 'is-active' : ''}`}>
				<svg viewBox='0 0 13 13' fill='none' width='100%' height='100%'>
					<path
						d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z'
						fill='currentColor'
					/>
				</svg>
			</div>
			<div className={`square_icon-square is-3 ${activeCount >= 3 ? 'is-active' : ''}`}>
				<svg viewBox='0 0 13 13' fill='none' width='100%' height='100%'>
					<path
						d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z'
						fill='currentColor'
					/>
				</svg>
			</div>
			<div className={`square_icon-square is-4 ${activeCount >= 4 ? 'is-active' : ''}`}>
				<svg viewBox='0 0 13 13' fill='none' width='100%' height='100%'>
					<path
						d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z'
						fill='currentColor'
					/>
				</svg>
			</div>
		</div>
	);
}



class CanvasSquarePattern {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	squares: Array<{
		x: number;
		y: number;
		size: number;
		targetSize: number;
		needsUpdate: boolean;
	}>;
	mouseX: number;
	mouseY: number;
	isAnimating: boolean;
	animationId: number | null;
	squareSize: number;
	spacing: number;
	hoverRadius: number;
	squareColor: string;
	displayWidth: number;
	displayHeight: number;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		const context = canvas.getContext('2d');
		if (!context) {
			throw new Error('Could not get 2D context');
		}
		this.ctx = context;
		this.squares = [];
		this.mouseX = 0;
		this.mouseY = 0;
		this.isAnimating = false;
		this.animationId = null;
		this.squareSize = 4;
		this.spacing = 8;
		this.hoverRadius = 200;
		this.squareColor = '#fff';
		this.displayWidth = 0;
		this.displayHeight = 0;
		this.init();
	}

	init() {
		this.setupCanvasSize();
		this.createSquares();
		this.setupEvents();
		this.render();
	}

	setupCanvasSize() {
		const parent = this.canvas.parentElement;
		if (!parent) return;
		const rect = parent.getBoundingClientRect();
		this.canvas.style.width = '100%';
		this.canvas.style.height = '100%';
		this.canvas.width = rect.width;
		this.canvas.height = rect.height;
		this.displayWidth = rect.width;
		this.displayHeight = rect.height;
	}

	createSquares() {
		this.squares = [];
		const cols = Math.floor(this.displayWidth / this.spacing);
		const rows = Math.floor(this.displayHeight / this.spacing);
		const totalGridWidth = cols * this.spacing;
		const totalGridHeight = rows * this.spacing;
		const offsetX = (this.displayWidth - totalGridWidth) / 2 + this.spacing / 2;
		const offsetY = (this.displayHeight - totalGridHeight) / 2 + this.spacing / 2;

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				this.squares.push({
					x: x * this.spacing + offsetX,
					y: y * this.spacing + offsetY,
					size: this.squareSize,
					targetSize: this.squareSize,
					needsUpdate: false,
				});
			}
		}
	}

	setupEvents() {
		let mouseMoveTimeout: number;

		this.canvas.addEventListener('mousemove', (e) => {
			const rect = this.canvas.getBoundingClientRect();
			this.mouseX = e.clientX - rect.left;
			this.mouseY = e.clientY - rect.top;

			this.updateSquares();
			this.startAnimation();

			window.clearTimeout(mouseMoveTimeout);
			mouseMoveTimeout = window.setTimeout(() => {
				this.checkIfAnimationNeeded();
			}, 100);
		});

		this.canvas.addEventListener('mouseleave', () => {
			this.squares.forEach((square) => {
				square.targetSize = this.squareSize;
				square.needsUpdate = true;
			});
			this.startAnimation();
		});
	}

	updateSquares() {
		this.squares.forEach((square) => {
			const dx = this.mouseX - square.x;
			const dy = this.mouseY - square.y;
			const distanceSquared = dx * dx + dy * dy;
			const radiusSquared = this.hoverRadius * this.hoverRadius;

			if (distanceSquared < radiusSquared) {
				const distance = Math.sqrt(distanceSquared);
				const effect = 1 - distance / this.hoverRadius;
				const newTargetSize = this.squareSize * (1 + effect * 2);

				if (Math.abs(square.targetSize - newTargetSize) > 0.1) {
					square.targetSize = newTargetSize;
					square.needsUpdate = true;
				}
			} else if (square.targetSize !== this.squareSize) {
				square.targetSize = this.squareSize;
				square.needsUpdate = true;
			}
		});
	}

	startAnimation() {
		if (!this.isAnimating) {
			this.isAnimating = true;
			this.animate();
		}
	}

	stopAnimation() {
		this.isAnimating = false;
		if (this.animationId !== null) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
	}

	checkIfAnimationNeeded() {
		let needsAnimation = false;
		for (const square of this.squares) {
			if (Math.abs(square.size - square.targetSize) > 0.1) {
				needsAnimation = true;
				break;
			}
		}

		if (!needsAnimation) {
			this.stopAnimation();
		}
	}

	animate() {
		if (!this.isAnimating) return;

		this.render();
		this.checkIfAnimationNeeded();

		if (this.isAnimating) {
			this.animationId = requestAnimationFrame(() => this.animate());
		}
	}

	render() {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);
		this.ctx.fillStyle = this.squareColor;

		let hasChanges = false;

		this.squares.forEach((square) => {
			if (Math.abs(square.size - square.targetSize) > 0.1) {
				square.size += (square.targetSize - square.size) * 0.15;
				hasChanges = true;
				square.needsUpdate = true;
			}

			const size = Math.max(1, square.size);
			this.ctx.fillRect(square.x - size / 2, square.y - size / 2, size, size);
		});

		if (!hasChanges) {
			this.stopAnimation();
		}
	}

	resize() {
		this.setupCanvasSize();
		this.createSquares();
		this.render();
	}
}

function NewsCardCanvas({ image, title, date }: { image: string; title: string; date: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const patternRef = useRef<CanvasSquarePattern | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const pattern = new CanvasSquarePattern(canvas);
		patternRef.current = pattern;

		const handleResize = () => {
			pattern.resize();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			pattern.stopAnimation();
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='card is-news'>
			<a href='#' className='card_content'>
				<div className='card_news-top'>
					<div className='max-width-medium'>
						<h3>{title}</h3>
					</div>
					<div className='card_news-top-right'>
						<div className='tag'>{date}</div>
						<div className='icon-embed-xsmall'>
							<svg viewBox='0 0 24 24' fill='none' className='h-full w-full'>
								<path
									d='M15 10L20 15L15 20'
									stroke='currentColor'
									strokeMiterlimit='10'
									strokeWidth='1'
								/>
								<path
									d='M4 4V12L7 15H20'
									stroke='currentColor'
									strokeMiterlimit='10'
									strokeWidth='1'
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className='card_news-image-container'>
					<div className='canvas-container'>
						<canvas ref={canvasRef} className='pattern-canvas' />
					</div>
					<img src={image} alt='' className='canvas_news-image' />
				</div>
			</a>
		</div>
	);
}

export default function App() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			autoResize: true,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
		lenis.on('scroll', ScrollTrigger.update);

		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest('a');
			if (anchor) {
				const href = anchor.getAttribute('href');
				if (href && href.startsWith('#')) {
					e.preventDefault();
					const targetEl = document.querySelector(href) as HTMLElement | null;
					if (targetEl) {
						lenis.scrollTo(targetEl, {
							duration: 1.6,
							easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
						});
					}
				}
			}
		};

		window.addEventListener('click', handleAnchorClick);

		return () => {
			window.removeEventListener('click', handleAnchorClick);
			lenis.destroy();
		};
	}, []);

	useGSAP(
		() => {
			// Init scroll restoration to manual
			if ('scrollRestoration' in window.history) {
				window.history.scrollRestoration = 'manual';
			}
			if (!window.location.hash) {
				window.scrollTo(0, 0);
			}

			// Setup pixel grids fade animation on scroll
			const setupPixelGridScroll = (
				selector: string,
				trigger: string,
				start: string,
				end: string
			) => {
				const squares = document.querySelectorAll(`${selector} .square`);
				if (!squares.length) return;

				const squareData = Array.from(squares).map((square) => {
					const el = square as HTMLElement;
					const row = parseInt(el.dataset.row || '0');
					const col = parseInt(el.dataset.col || '0');

					// Distance from bottom
					const distanceFromBottom = 17 - 1 - row;
					const basePriority = distanceFromBottom * 50;
					const randomFactor = Math.random() * 300;
					const waveEffect = Math.sin(col * 0.3) * 30;

					return {
						element: el,
						priority: basePriority + randomFactor + waveEffect,
					};
				});

				squareData.sort((a, b) => a.priority - b.priority);

				ScrollTrigger.create({
					trigger: trigger,
					start: start,
					end: end,
					scrub: 1,
					onUpdate: (self) => {
						const progress = self.progress;
						const totalSquares = squareData.length;
						const visibleCount = Math.floor(totalSquares * progress);

						squareData.forEach((data, index) => {
							if (index < visibleCount) {
								gsap.to(data.element, { opacity: 1, duration: 0.5, ease: 'power2.out' });
							} else {
								gsap.to(data.element, { opacity: 0, duration: 0.5, ease: 'power2.out' });
							}
						});
					},
				});
			};

			// Apply pixel transition grid to Hero & Footer
			setupPixelGridScroll('.section_header', '.section_header', 'top top', 'bottom top');
			setupPixelGridScroll('.footer', '.footer', 'top bottom', 'top top');

			let headerDelayCounter = 0;

			function getScrollTriggerConfig(trigger: HTMLElement, start = "top top", resetCounter = false) {
				if (trigger.closest('.section_header')) {
					if (resetCounter) {
						headerDelayCounter = 0;
					}

					// Progressive delay: 0.8s, 0.9s, 1s, 1.1s...
					const currentDelay = 0.8 + (headerDelayCounter * 0.1);
					headerDelayCounter++;

					return { 
						delay: currentDelay,
					};
				}

				return {
					scrollTrigger: {
						trigger: trigger,
						start: start,
						toggleActions: "play none none none",
					}
				};
			}

			function animateNavbarLogo() {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".section_header",
						start: "center center", 
						toggleActions: "play none none reverse",
					}
				});
				tl.to(".navbar_logo-link", {
					width: "5rem",
					paddingLeft: "1.5rem",
					paddingRight: "1.5rem",
					duration: 1,
					ease: "power3.inOut",
				})
				.to(".navbar_logo-link .logo-letter", {
					opacity: 0,
					duration: 1,
					ease: "power3.inOut",
				}, 0);
			}

			function animateNavbarBackground() {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".section.is-quote",
						start: "top center",
						toggleActions: "play none none reverse",
					}
				});
				tl.to(".navbar_component", {
					backgroundColor: "var(--color-scheme-1--background)",
					duration: 0.5,
					ease: "power2.out",
				});

				if (window.innerWidth < 991) {
					tl.to(".navbar_menu-links", {
						backgroundColor: "var(--color-scheme-1--background)",
						borderTop: "1px solid var(--_navbar---border-color)",
						duration: 0.5,
						ease: "power2.out",
					}, 0);
				}
			}

			function animateSubheadSquares() {
				gsap.utils.toArray<HTMLElement>(".subhead").forEach(subhead => {
					const squares = subhead.querySelectorAll(".subhead_square");
					gsap.set(squares, { scale: 0, opacity: 0 });

					gsap.to(squares, {
						scale: 1,
						opacity: 1,
						duration: 1,
						ease: "power3.inOut",
						stagger: 0.01,
						scrollTrigger: {
							trigger: subhead,
							start: "top 90%",
							toggleActions: "play none none none",
						}
					});
				});
			}

			function animateIconSquares() {
				gsap.utils.toArray<HTMLElement>(".square_icon").forEach(icon => {
					const squares = icon.querySelectorAll(".square_icon-square");
					gsap.set(squares, { scale: 0, opacity: 0 });

					gsap.to(squares, {
						scale: 1,
						opacity: 1,
						duration: 1,
						ease: "power3.inOut",
						stagger: 0.01,
						scrollTrigger: {
							trigger: icon,
							start: "top 90%",
							toggleActions: "play none none none",
						}
					});
				});
			}

			function animateBorderH() { 
				headerDelayCounter = 0; // Reset delay counter for header
				gsap.utils.toArray<HTMLElement>(".grid").forEach(divider => {
					const lines = divider.querySelectorAll(".divider-horizontal");
					gsap.set(lines, { width: 0, opacity: 0 });

					gsap.to(lines, {
						width: "100%",
						opacity: 1,
						duration: 1,
						ease: "power3.inOut",
						stagger: 0.01,
						...getScrollTriggerConfig(divider, "top 80%")
					});
				});
			}

			function animateBorderV() { 
				gsap.utils.toArray<HTMLElement>(".grid").forEach(divider => {
					const lines = divider.querySelectorAll(".divider-vertical");
					gsap.set(lines, { height: 0, opacity: 0 });

					gsap.to(lines, {
						height: "100%",
						opacity: 1,
						duration: 1,
						ease: "power3.inOut",
						stagger: 0.01,
						...getScrollTriggerConfig(divider, "top 80%")
					});
				});
			}

			function animateBox() {
				const section = document.querySelector<HTMLElement>(".section.is-quote");
				if (!section) return;

				const cards = gsap.utils.toArray<HTMLElement>(".grid_card .card", section);
				const cardContent = gsap.utils.toArray<HTMLElement>(".grid_card .card_content", section);
				const paths = gsap.utils.toArray<SVGPathElement>(".card-line path", section);
				const borders = gsap.utils.toArray<HTMLElement>(".grid_card-line .border-left, .grid_card-line .border-right", section);
				if (cards.length === 0 || cardContent.length === 0) return;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: section.querySelector(".grid_card"),
						start: "top 88%",
						end: "top 45%",
						scrub: 0.6,
					}
				});

				gsap.set(cardContent, { opacity: 0 });
				paths.forEach(path => {
					const length = path.getTotalLength();
					gsap.set(path, {
						strokeDasharray: length,
						strokeDashoffset: length
					});
				});
				gsap.set(borders, { height: 0 });

				tl.to(cardContent, {
						opacity: 1,
						duration: 1,
						ease: "power3.inOut",
					});

				if (paths.length > 0) {
					tl.to(paths, {
						strokeDashoffset: 0,
						duration: 1.2,
						ease: "power3.inOut",
					}, "-=0.5");
				}

				if (borders.length > 0) {
					tl.to(borders, {
						height: "3rem",
						duration: 1,
						ease: "power3.inOut",
					}, "<");
				}
			}

			function animateTextElements() {
				gsap.utils.toArray<HTMLElement>('[data-animate="slide-up"]').forEach(element => {
					gsap.set(element, { opacity: 1 });

					const splitText = new SplitText(element, { 
						type: "lines,words,chars",
						linesClass: "line",
						wordsClass: "word", 
						charsClass: "char"
					});

					gsap.fromTo(splitText.lines, {
						y: '110%',
						opacity: 0
					}, {
						y: '0%',
						opacity: 1,
						duration: 1,
						ease: "power3.out",
						stagger: 0.1,
						...getScrollTriggerConfig(element, "top 80%")
					});
				});

				gsap.utils.toArray<HTMLElement>('.catchphrase_sticky-container.is-first').forEach(element => {
					const heading = element.querySelector<HTMLElement>('h2');
					if (!heading) return;

					const splitText = new SplitText(heading, {
						type: "words,chars",
						wordsClass: "word",
						charsClass: "char"
					});
					const words = splitText.words as HTMLElement[];
					if (words.length > 0) {
						gsap.set(words, { color: "#444444" });
						gsap.to(words, {
							color: "#f4f4f4",
							ease: "none",
							stagger: {
								each: 0.08,
							},
							scrollTrigger: {
								trigger: element,
								start: "top 65%",
								end: window.innerWidth <= 768 ? "center 65%" : "bottom 35%",
								scrub: 0.6,
							}
						});
					}
				});
			}

			function animateOpacity() {
				gsap.utils.toArray<HTMLElement>('[data-animate="opacity"]').forEach(element => {
					gsap.set(element, { opacity: 0 });

					gsap.to(element, {
						opacity: 1,
						duration: 1,
						ease: "power2.out",
						...getScrollTriggerConfig(element, "top 80%")
					});
				});
			}

			function animateJoinUsRects() {
				const section = document.querySelector("#section-join-us");
				if (!section) return;

				const container = section.querySelector(".catchphrase_sticky-container");
				const rects = section.querySelectorAll("rect");
				if (rects.length === 0) return;

				const rectsData = Array.from(rects).map((rect, index) => {
					return {
						element: rect,
						randomOrder: Math.random(),
						originalIndex: index
					};
				});

				rectsData.sort((a, b) => a.randomOrder - b.randomOrder);

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: container || section,
						start: "top top",
						end: "bottom bottom",
						scrub: true,
					}
				});

				rectsData.forEach((data, index) => {
					const delay = index * 0.1;
					tl.from(data.element, {
						height: 0,
						duration: 1,
						ease: "power3.inOut",
					}, delay);
				});
			}

			function animateCardHover() {
				const cards = document.querySelectorAll('.card_opacity');
				const allChars = document.querySelectorAll('.catchphrase_sticky h2 .char');

				cards.forEach((card, index) => {
					const cardEl = card as HTMLElement;
					cardEl.addEventListener('mouseenter', () => {
						const targetClass = `catchphrase_i${index + 1}`;

						// Dim other cards
						cards.forEach((otherCard, otherIndex) => {
							if (otherIndex !== index) {
								(otherCard as HTMLElement).style.opacity = '0.3';
							}
						});

						// Dim all chars in tagline
						allChars.forEach(char => {
							(char as HTMLElement).style.opacity = '0.3';
						});

						// Highlight matching chars
						const targetSpans = document.querySelectorAll(`.catchphrase_sticky h2 span.${targetClass} .char`);
						targetSpans.forEach(char => {
							(char as HTMLElement).style.opacity = '1';
						});
					});

					cardEl.addEventListener('mouseleave', () => {
						// Reset all cards
						cards.forEach(card => {
							(card as HTMLElement).style.opacity = '1';
						});

						// Reset all chars
						allChars.forEach(char => {
							(char as HTMLElement).style.opacity = '1';
						});
					});
				});
			}

			// Execute all animations
			animateNavbarLogo();
			animateNavbarBackground();
			animateSubheadSquares();
			animateIconSquares();
			animateBorderH();
			animateBorderV();
			animateBox();
			animateTextElements();
			animateOpacity();
			animateJoinUsRects();
			animateCardHover();

			ScrollTrigger.refresh();
			requestAnimationFrame(() => {
				ScrollTrigger.refresh();
				ScrollTrigger.update();
			});
		},
		{ scope: rootRef }
	);

	return (
		<div ref={rootRef} className='page-wrapper'>
			{/* Navbar */}
			<header className='navbar_component' role='banner'>
				<div className='navbar_container'>
					<a
						href='#section-home'
						className='navbar_logo-link'
						onClick={() => setMobileMenuOpen(false)}
					>
						<div className='navbar_logo'>
							<LogoWordmark />
						</div>
					</a>
					<div className='navbar_nav'>
						<div className='navbar_hover'>
							{/* Hamburger Menu Button */}
							<button
								type='button'
								aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
								aria-expanded={mobileMenuOpen}
								className={`navbar_menu-button w-nav-button ${mobileMenuOpen ? 'w--open' : ''}`}
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							>
								<div className='menu-icon1'>
									<div className={`menu-icon1_line-top ${mobileMenuOpen ? 'is-open' : ''}`}></div>
									<div className={`menu-icon1_line-middle ${mobileMenuOpen ? 'is-open' : ''}`}>
										<div className='menu-icon1_line-middle-inner'></div>
									</div>
									<div className={`menu-icon1_line-bottom ${mobileMenuOpen ? 'is-open' : ''}`}></div>
								</div>
							</button>

							<nav
								className={`navbar_menu is-page-height-tablet w-nav-menu ${mobileMenuOpen ? 'w--open' : ''}`}
								role='navigation'
							>
								<div className='navbar_menu-links'>
									<a
										href='#anchor-about'
										className='navbar_link'
										onClick={() => setMobileMenuOpen(false)}
									>
										about
									</a>
									<a
										href='#anchor-join-us'
										className='navbar_link'
										onClick={() => setMobileMenuOpen(false)}
									>
										Join us
									</a>
								</div>
							</nav>
						</div>
						<div className='navbar_menu-buttons'>
							<a href='mailto:contact@lithosquare.com' className='button_icon-wrapper'>
								<div className='button is-no-background'>
									<div className='button_text'>Contact us</div>
								</div>
								<div className='button is-icon-only'>
									<div className='icon-embed-xsmall'>
										<ContactIcon />
									</div>
								</div>
								<div className='button_background'></div>
							</a>
						</div>
					</div>
				</div>
			</header>

			<main className='main-wrapper'>
				{/* Section 1: Hero */}
				<header id='section-home' className='section_header'>
					<div className='padding-global'>
						<div className='container-large'>
							<div className='header_content'>
								<div className='padding-section-medium' style={{ width: '100%' }}>
									<div className='header_grid grid'>
										<div className='divider-horizontal'>
											<div className='divider-horizontal_focus' />
										</div>
										<div data-animate='slide-up' className='header_heading is-next-gen'>
											Next-gen
										</div>
										<div className='divider-vertical hide-tablet'>
											<div className='divider-vertical_focus' />
										</div>
										<div data-animate='slide-up' className='header_heading is-exploration'>
											Exploration
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='header_background-video-wrapper'>
						<video
							className='header_background-video'
							autoPlay
							muted
							loop
							playsInline
							poster='https://cdn.prod.website-files.com/683fe9ed9abe575daebf241b/68416959317862f3216d0ee0_cover-3.webp'
						>
							<source src='https://assets.mprez.fr/lithosquare/lithosquare.mp4' type='video/mp4' />
							<source
								src='https://assets.mprez.fr/lithosquare/lithosquare.webm'
								type='video/webm'
							/>
						</video>
						<div className='header_background-overlay' />
					</div>
					<SquareGrid />
				</header>

				{/* Section 2: Quote & Cards */}
				<section id='section-about' className='section is-quote'>
					<div className='padding-global'>
						<div className='container-large'>
							{/* Sticky catchphrase */}
							<div className='catchphrase_sticky-container is-first'>
								<div className='catchphrase_sticky'>
									<div className='padding-top padding-xxhuge'>
										<div className='text-align-center'>
											<div className='max-width-custom'>
												<div className='margin-bottom margin-xlarge'>
													<div className='square_icon-center'>
														<BrandIcon activeCount={1} />
													</div>
												</div>
												<div className='margin-bottom margin-xlarge'>
													<div className='subhead_wrapper'>
														<div className='subhead'>
															<SubheadSquares />
															<div className='icon-embed-tiny'>
																<svg viewBox='0 0 13 13' fill='currentColor' className='h-full w-full'>
																	<path d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z' />
																</svg>
															</div>
															<div className='z-10 px-2 font-mono text-xs text-black'>next-gen Exploration</div>
														</div>
													</div>
												</div>
												<h2>
													Lithosquare{' '}
													<span className='catchphrase_i2'>
														redefines strategic mineral exploration
													</span>{' '}
													by{' '}
													<span className='catchphrase_i3'>
														combining foundational AI and deep geology expertise. 
													</span>
													<span className='catchphrase_i1'>
														More deposits, faster discoveries, greater accuracy, lower costs.
													</span>
												</h2>
											</div>
										</div>
									</div>
								</div>
								<div id='anchor-about' className='catchphrase_anchor'></div>
							</div>
						</div>
					</div>

					<div className='padding-bottom padding-xhuge padding-global'>
						<div className='container-large'>
							{/* Contact Us button */}
							<div className='quote_contact'>
								<div data-animate='opacity' className='button_wrapper'>
									<a href='mailto:contact@lithosquare.com?subject=New%20Contact%20%2F%20LIthosquare' className='button_icon-wrapper'>
										<div className='button is-no-background'>
											<div className='button_text'>CONTACT US</div>
										</div>
										<div className='button is-icon-only'>
											<div className='icon-embed-xsmall'>
												<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
													<path d='M3 19.0003V5.00026L5 3.00026H19L21 5.00026V19.0003L19 21.0003H5L3 19.0003Z' stroke='currentColor' strokeMiterlimit='10'/>
													<path d='M8 12.0003L12 8.00026L16 12.0003' stroke='currentColor' strokeMiterlimit='10'/>
													<path d='M12 8.00026V17.0003' stroke='currentColor' strokeMiterlimit='10'/>
												</svg>
											</div>
										</div>
										<div className='button_background'></div>
									</a>
								</div>
							</div>

							{/* Features Cards */}
							<div className='grid_card'>
								{/* Card 01 */}
								<div className='card'>
									<div className='card_opacity'>
										<div className='card_content'>
											<div className='mb-8'>
												<div className='box_top mb-4'>
													<div className='tag is-text'>01</div>
													<div className='icon-embed-tiny'>
														<svg viewBox='0 0 13 13' fill='currentColor' className='h-full w-full'>
															<path d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z' />
														</svg>
													</div>
												</div>
												<h3 className='quote_card-title'>
													{features[0].title}
												</h3>
											</div>
											<p className='quote_card-body'>{features[0].body}</p>
										</div>
									</div>
								</div>

								{/* Connector Line 1 */}
								<div className='grid_card-line'>
									<svg
										className='card-line'
										width='100%'
										height='100%'
										xmlns='http://www.w3.org/2000/svg'
										version='1.1'
										viewBox='0 0 222.07 302.25'
									>
										<path
											stroke='currentColor'
											strokeWidth='1'
											fill='none'
											d='M0,.5h0c34.39,0,65.01,21.75,76.34,54.22l67.29,192.82c11.33,32.47,41.96,54.22,76.34,54.22h2.1'
										/>
									</svg>
									<div className='border-left'></div>
									<div className='border-right'></div>
								</div>

								{/* Card 02 */}
								<div className='card'>
									<div className='card_opacity'>
										<div className='card_content'>
											<div className='mb-8'>
												<div className='box_top mb-4'>
													<div className='tag is-text'>02</div>
													<div className='icon-embed-tiny'>
														<svg viewBox='0 0 13 13' fill='currentColor' className='h-full w-full'>
															<path d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z' />
														</svg>
													</div>
												</div>
												<h3 className='quote_card-title'>
													{features[1].title}
												</h3>
											</div>
											<p className='quote_card-body'>{features[1].body}</p>
										</div>
									</div>
								</div>

								{/* Connector Line 2 */}
								<div className='grid_card-line'>
									<svg
										className='card-line'
										width='100%'
										height='100%'
										xmlns='http://www.w3.org/2000/svg'
										version='1.1'
										viewBox='0 0 222.07 302.25'
									>
										<path
											stroke='currentColor'
											strokeWidth='1'
											fill='none'
											d='M222.07.5h0c-34.39,0-65.01,21.75-76.34,54.22l-67.29,192.82c-11.33,32.47-41.96,54.22-76.34,54.22H0'
										/>
									</svg>
									<div className='border-left is-right'></div>
									<div className='border-right is-right'></div>
								</div>

								{/* Card 03 */}
								<div className='card'>
									<div className='card_opacity'>
										<div className='card_content'>
											<div className='mb-8'>
												<div className='box_top mb-4'>
													<div className='tag is-text'>03</div>
													<div className='icon-embed-tiny'>
														<svg viewBox='0 0 13 13' fill='currentColor' className='h-full w-full'>
															<path d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z' />
														</svg>
													</div>
												</div>
												<h3 className='quote_card-title'>
													{features[2].title}
												</h3>
											</div>
											<p className='quote_card-body'>{features[2].body}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Vignette Pattern background */}
					<div className='pattern_component'>
						<div className='pattern_container'>
							<div className='pattern_overlay' />
						</div>
					</div>
				</section>

				{/* Section 3: Join Us */}
				<section id='section-join-us' className='section is-quote'>
					<div className='padding-global'>
						<div className='container-large'>
							<div className='catchphrase_sticky-container'>
								<div className='catchphrase_sticky-100'>
									<div className='padding-section-large'>
										<div className='text-align-center'>
											<div className='max-width-xlarge align-center'>
												<div className='margin-bottom margin-xlarge'>
													<div className='square_icon-center'>
														<BrandIcon activeCount={2} />
													</div>
												</div>
												<h2 data-animate='slide-up'>
													Lithosquare brings together a multidisciplinary team of passionate geology and AI
													pioneers, designing the future of exploration for energy transition.
												</h2>
												<div className='margin-top margin-xlarge'>
													<div data-animate='opacity' className='button_wrapper'>
														<a
															href='https://www.linkedin.com/company/lithosquare'
															target='_blank'
															rel='noreferrer'
															className='button_icon-wrapper is-white'
														>
															<div className='button is-no-background'>
																<div className='button_text'>Join us</div>
															</div>
															<div className='button is-icon-only'>
																<div className='icon-embed-xsmall'>
																	<ContactIcon />
																</div>
															</div>
															<div className='button_background'></div>
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* Height animated rect shape overlay */}
									<div className='catchprase_shape'>
										<div className='catchprase_shape-embed w-embed'>
											<svg viewBox='0 0 450 360' width='100%' height='100%' preserveAspectRatio='none'>
												{shapeRects.map((r, i) => (
													<rect
														key={i}
														x={r.x}
														y={r.y}
														width={r.w}
														height={r.h}
														fill='currentColor'
														stroke='currentColor'
														strokeWidth='0.25px'
													/>
												))}
											</svg>
										</div>
									</div>
								</div>
								<div id='anchor-join-us'></div>
							</div>
						</div>
					</div>
				</section>

				{/* Section 4: News */}
				<section id='section-news' className='section is-news'>
					<div className='padding-global'>
						<div className='container-large'>
							<div className='padding-section-large'>
								<div className='title_grid grid'>
									<div className='divider-horizontal'>
										<div className='divider-horizontal_focus' />
									</div>
									<div className='title_padding'>
										<div className='subhead'>
											<SubheadSquares />
											<div className='icon-embed-tiny'>
												<svg viewBox='0 0 13 13' fill='currentColor' className='h-full w-full'>
													<path d='M1.95068 1.34131H11.0493C11.3605 1.3414 11.6126 1.5936 11.6128 1.90479V11.0942C11.6128 11.4056 11.3607 11.6586 11.0493 11.6587H1.95068C1.63944 11.6585 1.38721 11.4055 1.38721 11.0942V1.90479C1.38744 1.59369 1.63959 1.34154 1.95068 1.34131Z' />
												</svg>
											</div>
											<div className='z-10 px-2 font-mono text-xs text-black'>News</div>
										</div>
									</div>
									<div className='divider-vertical hide-mobile-landscape'>
										<div className='divider-vertical_focus' />
									</div>
									<div className='title_padding'>
										<div className='max-width-large'>
											<h2 data-animate='slide-up'>Our Updates</h2>
										</div>
									</div>
									<div className='title_padding'>
										<BrandIcon activeCount={4} />
									</div>
								</div>
								<div className='margin-top margin-xhuge'>
									<div className='news_grid'>
										{newsItems.map((item, index) => (
											<div className='news_item' key={index}>
												<NewsCardCanvas image={item.image} title={item.title} date={item.date} />
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='footer'>
				<div className='padding-global z-index-2 w-full'>
					<div className='container-large'>
						<div className='padding-section-medium'>
							<div className='padding-bottom padding-xlarge'>
								<div className='footer_top-wrapper'>
									<div className='footer_left-wrapper'>
										<div className='logo_embed'>
											<LogoWordmark />
										</div>
									</div>
									<div className='footer_menu-wrapper'>
										<div className='footer_link-list'>
											<a href='#anchor-about' className='footer_link'>
												<span>About</span>
												<BrandIcon activeCount={1} />
											</a>
											<a href='#anchor-join-us' className='footer_link'>
												<span>Join us</span>
												<BrandIcon activeCount={2} />
											</a>
										</div>
									</div>
								</div>
								<HeadingDivider />
								<div className='padding-top padding-medium'>
									<div className='footer_bottom-wrapper'>
										<div className='footer_credit-text'>©2026 Lithosquare</div>
										<a
											href='https://www.linkedin.com/company/lithosquare/'
											target='_blank'
											rel='noreferrer'
										>
											<div className='icon-embed-xsmall'>
												<LinkedInIcon />
											</div>
										</a>
										<div className='footer_legal-list'>
											<a href='#' className='footer_legal-link'>
												Legal
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<SquareGrid />
			</footer>
		</div>
	);
}
