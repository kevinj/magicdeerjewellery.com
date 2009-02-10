PERL='/sw/bin/perl5.8.6'

ALL_TEMPLATES=$(wildcard template/*.tt2)
OTHER_TEMPLATES=template/wrapper.tt2 template/rollover.tt2
TEMPLATES=$(filter-out $(OTHER_TEMPLATES),$(ALL_TEMPLATES))
HTML=$(TEMPLATES:template/%.tt2=%.html)

all: $(HTML)

clean:
	rm $(HTML)

%.html: $(OTHER_TEMPLATES) template/%.tt2
	$(PERL) bin/process $(@:%.html=%)
	@grep $@ .gitignore >/dev/null || echo $@ >> .gitignore && :

upload:
	scp -r *.html images/ css/ vanjew@magicjewellery.com:
