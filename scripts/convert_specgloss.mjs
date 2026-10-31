// Convert archived KHR_materials_pbrSpecularGlossiness materials to core metallic-roughness.
// Used at build time for the Sketchfab M4 viewmodel, whose only export format is spec/gloss.
import fs from 'node:fs';

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error('usage: node convert_specgloss.mjs input.glb output.glb');
  process.exit(1);
}

const glb = fs.readFileSync(input);
if (glb.readUInt32LE(0) !== 0x46546c67) throw new Error('not a GLB');
const jsonLen = glb.readUInt32LE(12);
const json = JSON.parse(glb.subarray(20, 20 + jsonLen).toString('utf8'));
const binHeaderOffset = 20 + jsonLen;
const binLen = glb.readUInt32LE(binHeaderOffset);
const bin = glb.subarray(binHeaderOffset + 8, binHeaderOffset + 8 + binLen);

const tuning = {
  Hand_D: { metallic: 0.0, roughness: 0.7 },
  Glove_D: { metallic: 0.0, roughness: 0.88 },
  M4_D: { metallic: 0.38, roughness: 0.46 },
  Bullet5_56x45mm_D: { metallic: 0.9, roughness: 0.3 },
};

let converted = 0;
for (const material of json.materials ?? []) {
  const ext = material.extensions?.KHR_materials_pbrSpecularGlossiness;
  if (!ext) continue;
  const t = tuning[material.name] ?? { metallic: 0.1, roughness: 0.6 };
  material.pbrMetallicRoughness = {
    baseColorFactor: ext.diffuseFactor ?? [1, 1, 1, 1],
    metallicFactor: t.metallic,
    roughnessFactor: t.roughness,
    ...(ext.diffuseTexture ? { baseColorTexture: ext.diffuseTexture } : {}),
  };
  delete material.extensions.KHR_materials_pbrSpecularGlossiness;
  if (Object.keys(material.extensions).length === 0) delete material.extensions;
  converted++;
}

if (json.extensionsUsed) {
  json.extensionsUsed = json.extensionsUsed.filter((e) => e !== 'KHR_materials_pbrSpecularGlossiness');
  if (!json.extensionsUsed.length) delete json.extensionsUsed;
}
if (json.extensionsRequired) {
  json.extensionsRequired = json.extensionsRequired.filter((e) => e !== 'KHR_materials_pbrSpecularGlossiness');
  if (!json.extensionsRequired.length) delete json.extensionsRequired;
}

const jsonBytes = Buffer.from(JSON.stringify(json), 'utf8');
const jsonPad = (4 - (jsonBytes.length % 4)) % 4;
const jsonChunk = Buffer.concat([jsonBytes, Buffer.alloc(jsonPad, 0x20)]);
const binPad = (4 - (bin.length % 4)) % 4;
const binChunk = Buffer.concat([bin, Buffer.alloc(binPad)]);

const total = 12 + 8 + jsonChunk.length + 8 + binChunk.length;
const out = Buffer.alloc(total);
out.writeUInt32LE(0x46546c67, 0);
out.writeUInt32LE(2, 4);
out.writeUInt32LE(total, 8);
out.writeUInt32LE(jsonChunk.length, 12);
out.writeUInt32LE(0x4e4f534a, 16);
jsonChunk.copy(out, 20);
const binHead = 20 + jsonChunk.length;
out.writeUInt32LE(binChunk.length, binHead);
out.writeUInt32LE(0x004e4942, binHead + 4);
binChunk.copy(out, binHead + 8);

fs.writeFileSync(output, out);
console.log(`converted ${converted} materials -> ${output} (${out.length} bytes)`);
