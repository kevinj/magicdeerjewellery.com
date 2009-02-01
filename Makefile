PERL='/sw/bin/perl5.8.6'

ALL_TEMPLATES=$(wildcard template/*.tt2)
TEMPLATES=template/home.tt2 template/about1.tt2
HTML=$(TEMPLATES:template/%.tt2=%.html)

all: $(HTML)

clean:
	rm $(HTML)

$(HTML): $(ALL_TEMPLATES)
	$(PERL) bin/process $(@:%.html=%)
	@grep $@ .gitignores >/dev/null || echo $@ >> .gitignores && :
