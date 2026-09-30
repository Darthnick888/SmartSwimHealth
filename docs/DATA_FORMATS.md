# Stored data

The browser stores JSON arrays under two local-storage keys.

## `swimstrong-pain-entries`

Each entry has `id`, `date`, `location`, `severity`, and `notes` string fields.
`date` is an ISO timestamp and `severity` is one of `Low`, `Moderate`, or
`High` from the form options.

## `swimstrong-journal-entries`

Each entry has `id`, `date`, `sleep`, `hydration`, `mood`, and `notes` string
fields. `date` is stored as an ISO timestamp. `mood` is one of `Excellent`,
`Good`, `Okay`, or `Tired` from the form options.

There is no migration layer. Existing browser data is read and written as
these JSON arrays.
