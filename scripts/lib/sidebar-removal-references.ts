// Issue #64, based on main 8b785ee: remove only the article evidence sidebar.
// Hero/listing geometry, assets, captions, briefs and reviews are unchanged.
// These exact old -> new renderer hashes preserve existing provenance, not a new
// artwork approval or permission to reuse it for a newly generated output.
const preservedRecords: ReadonlyArray<readonly [string, string, string]> = [
  [
    '2026-10-12-clinical-ai-language-evidence',
    'ac421b7da41cd076245eff1d12816b3c263fb835085d7c746be329c5a5b9e632',
    'b50886b029a2930e8c9b4edfad9aa5c12dc6bd2cdc2c9829dde35d1d4a0a307d',
  ],
  [
    '2026-10-13-epilepsy-feedback-replay',
    'bdccf1da20d8095fcfd37bf961d5343f4bf1608a3bcdcf43f4c1b627543de242',
    'a863f5fe08d647ace5c99c1516310fa3029c91c32218a90a5e2e5311c46b410f',
  ],
  [
    '2026-10-19-oncology-ai-ehr-handoff',
    '38c21b765913541aee35248ceb8755a39fc403863a2ca25e44df349ac13cd4ec',
    '37e07212a5c0a0164d3edc9919421fee259703418dd85cf0910830b9a13bf974',
  ],
  [
    '2026-10-20-astrazeneca-oracle-trials-agreement',
    '3af70abf3b3553de70da03428e0f0f3adc16cb6d0c7fdc3f88fcae8f6bfe31c9',
    '1f3681c846b09af110091d0837b0d050a2ec2ec649677945b2a9950fd3118e86',
  ],
  [
    '2026-10-21-expertise-automation-bias-neonatal-imaging',
    '07a9e1ee2d7e58030838a1d9faa28248d4a171e44228fa593c27c2515fb6b5e0',
    'ceec09110a49de5df78c3b762e21c342209be0c47dda6428588e50f81cbc4408',
  ],
  [
    '2026-10-21-fda-ai-device-change-plan-examples',
    'fd1e653cc05d0239a32c9514e8e0650d2e278ed45d6890d1398412ab4a0285e5',
    'e278c322ab6f136db7c4cb5fcfdcb77738f64063961590e871a66700ee33915f',
  ],
  [
    '2026-10-22-tga-digital-scribe-review',
    '9c0f7c6f85def7ac911556c0231ddb0f9e78a0de3c36723a3d6d30d9d3bc8437',
    '2c9e7ee0401beecc47f4b99824fab5e1b222772e84fdfb09c1280f05069cfe92',
  ],
  [
    '2026-10-23-dynavelo-b-cell-rescue-predictions',
    'd324af1b0f4e2fad3c44a555f2f8c644d61df41c5dae54c2e8335beb1cf55e50',
    'dd4de99a4fa4abf3fcf28e2297e863133af510c05feac453bf9b9fc9dd95b648',
  ],
  [
    '2026-10-24-head-ct-ai-advice-reliance',
    'f529dac7b63961d1d1a7a1fa44a2dc5dcfd44ad9f6281ac15fa1ff60feda21dc',
    'dbd9a526bd1818350dad18c3a99d249368f2d50bf6346f226ff03640d3618d86',
  ],
  [
    '2026-10-24-microsoft-sequential-diagnosis-benchmark',
    'e280602f886445d94d460355186593de06275ba45e6680772c46d9a857d163eb',
    '89cbbc158b7f29f0f50efbc911959f18362eec2adc9dc50a14c3738c63600480',
  ],
];

const referenceTransitions: ReadonlyArray<readonly [string, string, string]> = [
  [
    'src/pages/stories/[...id].astro',
    '2c088b58c041762930eb35c4c3fa66578123c0e10ad36b0c79b8a60e3c369ca5',
    '50ba167685496b0583772688b309a627b60575a8d1fe2cc8c21b0dac981eda2c',
  ],
  [
    'src/styles/publication.css',
    '3a4d3423f332f045ab2e66987338d7c2fc7b2ab70f350a0300d5bff47c61f8af',
    '9bb77bd07ad7da4fd788dd4fa47b107c9b797a5c73044eff5354845b7c777729',
  ],
];

export function preservesSidebarRemovalReference(
  storyId: string,
  reviewHash: string | undefined,
  briefHash: string,
  path: string,
  previousHash: string,
  currentHash: string,
) {
  return (
    preservedRecords.some(
      ([id, review, brief]) => id === storyId && review === reviewHash && brief === briefHash,
    ) &&
    referenceTransitions.some(
      ([file, before, after]) => file === path && before === previousHash && after === currentHash,
    )
  );
}
