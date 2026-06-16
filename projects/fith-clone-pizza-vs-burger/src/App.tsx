import { useEffect, useRef, useState } from 'react';

const assets = {
	copy: 'https://cdn.prod.website-files.com/6061a9478165d56ae4e36fa7/606d71501887ab3f1e2f64ef_copy.svg',
	copyBlue:
		'https://cdn.prod.website-files.com/6061a9478165d56ae4e36fa7/606d82f418a40a96ea506d87_copy-blue.svg',
	heart:
		'https://cdn.prod.website-files.com/6061a9478165d56ae4e36fa7/606d774e7e2de89d446b7887_heart-pink.svg',
	star: 'https://cdn.prod.website-files.com/6061a9478165d56ae4e36fa7/606cb0d42b7fa227828086b0_rosace-02.svg',
	valid:
		'https://cdn.prod.website-files.com/6061a9478165d56ae4e36fa7/606db1da7622a7fca6c10bff_valid-icon.svg',
	vote: 'https://cdn.prod.website-files.com/6061a9478165d56ae4e36fa7/606a00dc9c3b856303803031_vote.svg',
};

type ChoiceId = 'pizza' | 'burger';

type Choice = {
	id: ChoiceId;
	emoji: string;
	initialVotes: number;
};

const choices: Choice[] = [
	{ id: 'pizza', emoji: '🍕', initialVotes: 5742 },
	{ id: 'burger', emoji: '🍔', initialVotes: 4826 },
];

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function usePointerMotion(rootRef: { current: HTMLElement | null }) {
	useEffect(() => {
		let frame = 0;

		const handlePointerMove = (event: PointerEvent) => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const root = rootRef.current;
				if (!root) {
					return;
				}

				const halfWidth = window.innerWidth / 2;
				const halfHeight = window.innerHeight / 2;
				const x = clamp((event.clientX - halfWidth) / halfWidth, -1, 1);
				const y = clamp((event.clientY - halfHeight) / halfHeight, -1, 1);

				root.style.setProperty('--mouse-x', x.toFixed(4));
				root.style.setProperty('--mouse-y', y.toFixed(4));
				root.style.setProperty('--mouse-abs-x', Math.abs(x).toFixed(4));
				root.style.setProperty('--mouse-center-x', (1 - Math.abs(x)).toFixed(4));
				root.style.setProperty('--mouse-right', Math.max(x, 0).toFixed(4));
				root.style.setProperty('--mouse-up', Math.max(-y, 0).toFixed(4));
			});
		};

		window.addEventListener('pointermove', handlePointerMove, { passive: true });

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', handlePointerMove);
		};
	}, [rootRef]);
}

function CloneProjectButton() {
	return (
		<a
			data-testid='clone-project-link'
			href='https://webflow.com/website/pizza-burger'
			className='pb-button clone-button'
		>
			<span className='icon-container' aria-hidden='true'>
				<img src={assets.copy} alt='' className='copy-icon copy-icon-light' />
				<img src={assets.copyBlue} alt='' className='copy-icon copy-icon-blue' />
			</span>
			<span className='button-text'>Clone project</span>
		</a>
	);
}

function VoteChoice({
	choice,
	hoveredChoice,
	isSelected,
	isSaving,
	votes,
	onHover,
	onLeave,
	onVote,
}: {
	choice: Choice;
	hoveredChoice: ChoiceId | null;
	isSelected: boolean;
	isSaving: boolean;
	votes: number;
	onHover: (choice: ChoiceId) => void;
	onLeave: () => void;
	onVote: (choice: ChoiceId) => void;
}) {
	const isHovered = hoveredChoice === choice.id;

	return (
		<div className='collection-item'>
			<button
				type='button'
				className={`vote-toggle${isHovered ? ' is-hovered' : ''}${isSelected ? ' is-selected' : ''}${isSaving ? ' is-saving' : ''}`}
				aria-label={`Vote for ${choice.id}`}
				onClick={() => onVote(choice.id)}
				onPointerEnter={() => onHover(choice.id)}
				onPointerLeave={onLeave}
				aria-disabled={isSaving}
			>
				<span className='choice-link-block'>
					<span className='choice-content'>
						{isSaving ? (
							<div className='saving-favorite'>
								<span className='vote-text'>Saving</span>
							</div>
						) : isSelected ? (
							<img src={assets.valid} alt='' className='valid-icon' />
						) : (
							<span className='emoji' aria-hidden='true'>
								{choice.emoji}
							</span>
						)}
					</span>
					<img src={assets.vote} alt='' className='vote-badge' />
				</span>
			</button>
			<div className='vote-result-container'>
				<span className='vote-text'>{votes}</span>
				<span className='vote-text'>votes</span>
			</div>
		</div>
	);
}

function Face() {
	return (
		<>
			<div className='head-container'>
				<div className='hear-container left-hear-container'>
					<div className='left-hear' />
				</div>
				<div className='head'>
					<div className='hair-and-face'>
						<div className='hair-overflow-hidden'>
							<div className='hair-container'>
								<div className='hair-01' />
								<div className='hair-02' />
							</div>
						</div>
						<div className='face'>
							<div className='part-01'>
								<div className='eyebrow eyebrow-01' />
								<div className='eyebrow eyebrow-02' />
							</div>
							<div className='part-02'>
								<Eye />
								<div className='space-between-eyes' />
								<Eye />
							</div>
							<div className='part-03'>
								<div className='nose' />
							</div>
							<div className='part-04'>
								<div className='mouth'>
									<div className='teeth' />
									<div className='tongue' />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='hear-container right-hear-container'>
					<div className='right-hear' />
				</div>
			</div>
			<div className='star-overflow-hidden'>
				<img src={assets.star} alt='' className='rotate-star' />
			</div>
		</>
	);
}

function Eye() {
	return (
		<div className='eye-container'>
			<div className='eye'>
				<div className='pupil' />
			</div>
			<img src={assets.heart} alt='' className='heart-pupil' />
		</div>
	);
}

function Footer() {
	return (
		<footer className='footer'>
			<a href='https://pierrelouis.design' target='_blank' rel='noreferrer' className='pb-button'>
				100% natively designed on Webflow by Pierre-Louis Labonne
			</a>
			<a
				href='https://www.airtableinvoicemaker.com'
				target='_blank'
				rel='noreferrer'
				className='pb-button is-aim'
			>
				FREELANCER? create your invoices super fast!
			</a>
		</footer>
	);
}

export default function App() {
	const rootRef = useRef<HTMLElement | null>(null);
	usePointerMotion(rootRef);
	const [hoveredChoice, setHoveredChoice] = useState<ChoiceId | null>(null);
	const [selectedChoices, setSelectedChoices] = useState<Set<ChoiceId>>(() => new Set());
	const selectedChoicesRef = useRef<Set<ChoiceId>>(new Set());
	const [savingChoices, setSavingChoices] = useState<Set<ChoiceId>>(() => new Set());
	const [voteTotals, setVoteTotals] = useState(() => ({
		pizza: choices[0].initialVotes,
		burger: choices[1].initialVotes,
	}));

	const handleVote = (choice: ChoiceId) => {
		if (savingChoices.has(choice)) {
			return;
		}

		setSavingChoices((prev) => {
			const next = new Set(prev);
			next.add(choice);
			return next;
		});

		setTimeout(() => {
			const isSelected = selectedChoicesRef.current.has(choice);
			if (isSelected) {
				selectedChoicesRef.current.delete(choice);
				setVoteTotals((current) => ({
					...current,
					[choice]: current[choice] - 1,
				}));
			} else {
				selectedChoicesRef.current.add(choice);
				setVoteTotals((current) => ({
					...current,
					[choice]: current[choice] + 1,
				}));
			}
			setSelectedChoices(new Set(selectedChoicesRef.current));
			setSavingChoices((prev) => {
				const next = new Set(prev);
				next.delete(choice);
				return next;
			});
		}, 800);
	};

	return (
		<main
			ref={rootRef}
			className={`pb-site${hoveredChoice ? ' is-choice-hovered' : ''}`}
			data-testid='pizza-burger-clone'
		>
			<section className='section'>
				<header className='header'>
					<CloneProjectButton />
				</header>

				<div className='main-container'>
					<div className='choice-container' aria-label='Vote choices'>
						{choices.map((choice) => (
							<VoteChoice
								key={choice.id}
								choice={choice}
								hoveredChoice={hoveredChoice}
								isSelected={selectedChoices.has(choice.id)}
								isSaving={savingChoices.has(choice.id)}
								votes={voteTotals[choice.id]}
								onHover={setHoveredChoice}
								onLeave={() => setHoveredChoice(null)}
								onVote={handleVote}
							/>
						))}
					</div>

					<div className='face-container container'>
						<Face />
					</div>

					<div className='heading-container container' aria-label='pizza VS BURGER'>
						<h1 className='outline-heading'>pizza VS BURGER</h1>
						<h1 className='outline-heading'>pizza VS BURGER</h1>
						<h1 className='outline-heading'>pizza VS BURGER</h1>
					</div>
				</div>

				<Footer />
			</section>
		</main>
	);
}
