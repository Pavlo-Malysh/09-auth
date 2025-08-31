import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    if (isPrivateRoute) {
        if (!accessToken) {
            if (refreshToken) {
                const data = await checkServerSession();
                const setCookie = data.headers['set-cookie'];

                if (setCookie) {
                    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
                    for (const cookieStr of cookieArray) {
                        const parsed = parse(cookieStr);
                        const options = {
                            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                            path: parsed.Path,
                            maxAge: Number(parsed['Max-Age']),
                        };
                        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
                        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
                    }

                    // важливо — передаємо нові cookie далі, щоб оновити їх у браузері
                    return NextResponse.next({
                        headers: {
                            Cookie: cookieStore.toString(),
                        },
                    });
                }
            }

            // немає жодного токена — редірект на сторінку входу
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    // публічний маршрут або accessToken є — дозволяємо доступ
    // return NextResponse.next();

    if (isPublicRoute) {
        if (accessToken) {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
        if (refreshToken) {
            const data = await checkServerSession();
            const setCookie = data.headers['set-cookie'];

            if (setCookie) {
                const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
                for (const cookieStr of cookieArray) {
                    const parsed = parse(cookieStr);
                    const options = {
                        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                        path: parsed.Path,
                        maxAge: Number(parsed['Max-Age']),
                    };
                    if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
                    if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
                }


                return NextResponse.redirect(new URL('/', request.url));
            }
            return NextResponse.next({
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
        }
        return NextResponse.next({
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

    }

}

export const config = {
    matcher: ['/profile', '/sign-in', '/sign-up'],
}