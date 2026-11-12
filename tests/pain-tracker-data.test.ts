import assert from "node:assert/strict";
import test from "node:test";
import { causeGuides, getCauseGuideForLocation, getStretchMediaForStretch, getStretchesForLocation, locationsList } from "../lib/pain-tracker-data.ts";

test("location options retain the nine supported pain areas", () => {
  assert.deepEqual(locationsList, ["Shoulder", "Shoulder Rotator", "Neck", "Lower Back", "Back", "Hip", "Knee", "Ankle", "Wrist"]);
});

test("stretch lookup returns an empty list for an unknown area", () => {
  assert.deepEqual(getStretchesForLocation("Elbow"), []);
});

test("sleeper stretch media stays attached only to the sleeper stretch", () => {
  assert.match(getStretchMediaForStretch("Sleeper stretch - Hold for 30 seconds each side")?.src ?? "", /Sleeper_Stretch_Sleeper_Stretch\.gif$/);
  assert.equal(getStretchMediaForStretch("Reverse shoulder shrug - Hold 10 seconds, repeat 10x"), null);
});

test("cross-body shoulder media is attached to the cross-body recommendation", () => {
  const media = getStretchMediaForStretch("Cross-body shoulder stretch - Pull arm across chest");
  assert.match(media?.src ?? "", /i\.ytimg\.com\/vi\/Pg0JvLSfWwM\/maxresdefault\.jpg$/);
  assert.match(media?.alt ?? "", /cross-body shoulder stretch/i);
});

test("doorway pectoral media is attached to the doorway recommendation", () => {
  const media = getStretchMediaForStretch("Doorway pectoral stretch - Lean forward gently");
  assert.match(media?.src ?? "", /digitaldentistrynm\.com\/.*doorway-stretches\.jpg$/);
  assert.match(media?.alt ?? "", /doorway pectoral stretch/i);
});

test("child's pose media is attached to the child's pose recommendation", () => {
  const media = getStretchMediaForStretch("Child's pose - Hold for 30-45 seconds");
  assert.match(media?.src ?? "", /workoutguru\.fit\/.*child-pose-male-video-exercise-guide-tips-2-1536x864\.jpg$/);
  assert.match(media?.alt ?? "", /child's pose/i);
});

test("shoulder and shoulder-rotator selections share the swimmer's shoulder causes", () => {
  assert.equal(getCauseGuideForLocation("Shoulder")?.title, causeGuides.shoulder.title);
  assert.equal(getCauseGuideForLocation("Shoulder Rotator")?.title, causeGuides.shoulder.title);
});

test("cause lookup covers each documented swimmer pain area", () => {
  assert.equal(getCauseGuideForLocation("Knee")?.title, 'Knee ("Breaststroker\'s Knee")');
  assert.equal(getCauseGuideForLocation("Lower Back")?.title, "Lower back pain");
  assert.equal(getCauseGuideForLocation("Back")?.title, "Lower back pain");
  assert.equal(getCauseGuideForLocation("Neck")?.title, "Neck pain");
  assert.equal(getCauseGuideForLocation("Hip")?.title, "Hip injuries");
});

test("cause lookup returns null for locations without a documented guide", () => {
  assert.equal(getCauseGuideForLocation("Ankle"), null);
  assert.equal(getCauseGuideForLocation("Wrist"), null);
});
