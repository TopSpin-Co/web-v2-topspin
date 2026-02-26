import glob
import os

html_files = glob.glob('*.html')
target = '''            <nav class="nav-links">
                <a href="index.html#servicios">Servicios</a>'''
replacement = '''            <nav class="nav-links">
                <div class="dropdown">
                    <a href="index.html#servicios" class="dropdown-toggle">Servicios <span class="dropdown-icon">▼</span></a>
                    <div class="dropdown-menu">
                        <a href="lgaas.html">LGaaS</a>
                        <a href="roaas.html">ROaaS</a>
                        <a href="crm-admin.html">CRM Admin</a>
                    </div>
                </div>'''

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if target in content:
        content = content.replace(target, replacement)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
