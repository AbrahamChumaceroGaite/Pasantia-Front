import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MENU_SIDE } from 'src/app/templates/menu';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService: AuthService) { }

    ngOnInit() {
   
        this.model = [
            {
                label: 'MENU',
                items: MENU_SIDE
            },
        ];
    }

    // Función para verificar si el usuario tiene permisos para ver el ítem del menú
    hasPermission(menuItem: any, userRole: string): boolean {
        // Si el ítem no tiene una propiedad 'rol', permitir que todos los roles lo vean
        if (!menuItem.rol) {
            return true;
        }

        // Verificar si el rol del usuario coincide con el rol permitido para el ítem
        return menuItem.rol === userRole;
    }
}
