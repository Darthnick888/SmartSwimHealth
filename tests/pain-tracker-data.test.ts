import assert from "node:assert/strict";
import test from "node:test";
import { causeGuides, getCauseGuideForLocation, getStretchesForLocation, locationsList } from "../lib/pain-tracker-data.ts";

test("location options retain the nine supported pain areas", () => {
  assert.deepEqual(locationsList, ["Shoulder", "Shoulder Rotator", "Neck", "Lower Back", "Back", "Hip", "Knee", "Ankle", "Wrist"]);
});

test("stretch lookup returns an empty list for an unknown area", () => {
  assert.deepEqual(getStretchesForLocation("Elbow"), []);
});

test("shoulder and shoulder-rotator selections share the swimmer's shoulder causes", () => {
  assert.equal(getCauseGuideForLocation("Shoulder")?.title, causeGuides.shoulder.title);
  assert.equal(getCauseGuideForLocation("Shoulder Rotator")?.title, causeGuides.shoulder.title);
});

test("cause lookup covers each documented swimmer pain area", () => {
  for (const location of ["Knee", "Lower Back", "Back", "Neck", "Hip"]) {
    assert.ok(getCauseGuideForLocation(location));
  }
});

test("cause lookup returns null for locations without a documented guide", () => {
  assert.equal(getCauseGuideForLocation("Ankle"), null);
  assert.equal(getCauseGuideForLocation("Wrist"), null);
});
