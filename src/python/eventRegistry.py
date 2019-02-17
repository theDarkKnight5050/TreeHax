import eventregistry
# for item in dir(eventregistry):
#     print(item)

er = eventregistry.EventRegistry(apiKey = "353d669a-2ac9-4f45-ab4b-ef400f3901d5")
q = eventregistry.QueryArticlesIter(
    keywords = eventregistry.QueryItems.OR(["George Clooney", "Sandra Bullock"]),
    dataType = ["news", "blog"],
    lang = ["eng"]
)
for art in q.execQuery(er, sortBy = "date", maxItems = 5):
    print("\nTitle: %s\nSource URL: %s\nImage URL: %s\nBlurb: %s\n" % (art["title"], art["url"], art["image"], (art["body"][0:140] + "...")))
