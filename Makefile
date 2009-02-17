PERL=$(shell which perl)

ALL_TEMPLATES=$(wildcard template/*.tt2)
OTHER_TEMPLATES=template/wrapper.tt2 template/rollover.tt2 template/gallery.tt2
TEMPLATES=$(filter-out $(OTHER_TEMPLATES),$(ALL_TEMPLATES))
HTML=$(TEMPLATES:template/%.tt2=%.html)

all: $(HTML)

clean:
	rm $(HTML)

%.html: $(OTHER_TEMPLATES) template/%.tt2
	$(PERL) bin/process $(@:%.html=%)
	@grep $@ .gitignore >/dev/null || echo $@ >> .gitignore && :

upload:
	scp -P 222 -r *.html images/ css/ javascript/ vanjew@magicdeerjewellery.com:
