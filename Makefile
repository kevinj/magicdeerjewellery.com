PERL=$(shell which perl)

PASS=$(shell cat .pass)
ALL_TEMPLATES=$(wildcard template/*.tt2)
OTHER_TEMPLATES=template/wrapper.tt2 template/rollover.tt2 template/gallery.tt2
TEMPLATES=$(filter-out $(OTHER_TEMPLATES),$(ALL_TEMPLATES))
HTML=$(TEMPLATES:template/%.tt2=%.html)

all: $(HTML)

clean:
	rm $(HTML)

%.html: $(OTHER_TEMPLATES) template/%.tt2
	$(PERL) bin/process $(@:%.html=%) $(TIME)
	@grep $@ .gitignore >/dev/null || echo $@ >> .gitignore && :

HOST:=vanjew@magicdeerjewellery.com:
PORT:=222

upload-html:
	scp -P $(PORT) -r *.html css/ $(HOST)

upload-js:
	scp -P $(PORT) -r javascript/ $(HOST)

upload-images:
	scp -P $(PORT) -r images/ $(HOST)

upload: upload-html upload-js upload-images
